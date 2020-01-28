import React from 'react';
import { connect } from 'react-redux'
import Hours from './components/Hours/Hours'
import ScrumInput from './components/ScrumInput/ScrumInput'
import Buttons from './components/Buttons/Buttons'
import axios from 'axios'
import DisplayMarkdown from './components/DisplayMarkdown/DisplayMarkdown'
import Header from './components/Header/Header'
import './App.css';


class App extends React.Component {
  
  componentDidMount = () => {
    axios.get('/getTimes')
    .then((res) => {
      console.log("gettimes", res.data)
      this.props.initializeState(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }
  getIndex = () => {
    const curr = new Date();
    return curr.getHours()
  }
  render() {
    return (
      <div className="App">
        <Header />
        <div className="HoursCard">
          <Hours />
        </div>
        <div className="ScrumCard">
          <ScrumInput/>
        </div>
        <Buttons />
        <div className="MarkdownCard">
          <DisplayMarkdown />
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    times: state.times,
    ctr: state.ctr
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initializeState: (times) => dispatch({type: 'INITIALIZESTATE', times: times})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
