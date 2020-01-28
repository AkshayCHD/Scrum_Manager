const express = require('express')

const app = express()
const mongoose = require('mongoose')
const fs = require('fs')

const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

app.use(express.json()) // If the incoming requests contains json object then it parses it
app.use(express.urlencoded({ extended : true })) // If the incoming requests contains urlencoded data then parses it

const scrumSchema = new mongoose.Schema({
    timing: String,
    text: String
})

const Scrum = new mongoose.model('Scrum', scrumSchema);

mongoose.connect("mongodb://localhost/scrumsDatabase", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to Database..."))
    .catch(() => console.log("Error connecting to the db"))

const getUniqueIdentifier = (index) => {
    const date = new Date();
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-${index}`;
}

const saveScrum = (text, index) => new Promise( async (resolve, reject) => {
    try {
        console.log(text)
        let scrum = await Scrum.find({
            timing: getUniqueIdentifier(index)
        })
        console.log(scrum)
        if(scrum.length == 0) {
            console.log('if')
            scrum = new Scrum({
                timing: getUniqueIdentifier(index),
                text: text
            })
            const result = await scrum.save()
        } else {
            console.log('else')
            scrum[0].text = text;
            const result = await scrum[0].save()
        }
        //console.log(scrum)
        resolve(result);
    } catch {
        reject(new Error("Error occured"))
    }
})

app.post('/saveScrum', (req, res) => {
    console.log(req.body.items.text)
    saveScrum(req.body.items.text, req.body.index)
    .then((res) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    }) 
})

app.get('/getScrum/:index', (req, res) => {
    Scrum.find({
        timing: getUniqueIdentifier(req.params.index)
    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err)
    }) 
})

const getTimes = () => new Promise(async (resolve, reject) => {
    let times = []
    for(x in hours) {
        const res = await Scrum.find({
            timing: getUniqueIdentifier(x)    
        })

        if(res.length > 0) {
            times.push({
                text: res[0].text
            })
        } else {
            times.push({
                text: ""
            })
        }
    }
    //console.log(times)
    resolve(times);
})

app.get('/getTimes', (req, res) => {
    getTimes().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    }) 
})

const writeToFile = (file, text) => new Promise(async (resolve, reject) => {
    fs.writeFile(file, text, (err) => {
        // throws an error, you could also catch it here
        if (err) reject(new Error(err));
        
        // success case, the file was saved
        resolve('File Updated')
    });
})

app.post('/getTodaysScrum', (req, res) => {
    const file = `${__dirname}/scrum.md`;
    fs.writeFile(file, req.body.text, (err) => {
        // throws an error, you could also catch it here
        if (err) reject(new Error(err));
        
        // success case, the file was saved
        res.download(file)
    });
    return;
})


const PORT = 5000

app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`)
})

