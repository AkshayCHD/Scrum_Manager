import * as React from 'react';
import { connect } from 'react-redux'
import './Hours.css'

const Hours = (props) => {
    const getColor = (index) => {
        var current = new Date();
        return current.getHours() === index ? 'cornflowerblue' : current.getHours() > index ? 'orangered' : 'grey';
    }
    const getButtons = () => {
        return props.times.map((value, index) => <button className="HourButton" key={index} style={{backgroundColor: getColor(index)}}>{`Hour: ${index}`}</button>)
    }
    return getButtons()   
}

const mapStateToProps = state => {
    return {
      times: state.times
    }
}
  
  export default connect(mapStateToProps)(Hours);
  