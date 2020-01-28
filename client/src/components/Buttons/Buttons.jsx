import React from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

const Buttons = (props) => {
    const saveScrum = () => {
        const curr = new Date();
        axios.post('/saveScrum', {
            index: curr.getHours(),
            items: props.times[curr.getHours()]
        })
        .then(res => console.log(res))
        .catch(error => {
            console.log(error);
        });
    }
    const getScrum = () => {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        axios.post("/getTodaysScrum",
            {
                text: props.mdText
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/markdown'
                },
                responseType: "blob"
            }).then((response) => {
                const blob = new Blob([response.data], { type: 'text/plain' })
                const objectUrl = window.URL.createObjectURL(blob)
                a.href = objectUrl;
                a.download = "scrum.md";
                a.click();
                window.URL.revokeObjectURL(objectUrl);
            }).catch((error) => { alert(error) })
    }
    return (
        <div>
            <Button onClick={saveScrum}>Save Scrum</Button>
            <Button onClick={getScrum}>Get Scrum</Button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        times: state.times,
        mdText: state.mdText
    }
}

export default connect(mapStateToProps)(Buttons);