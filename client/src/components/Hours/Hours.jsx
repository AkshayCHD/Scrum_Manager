import * as React from 'react';
import { connect } from 'react-redux'
import './Hours.css'

const Hours = (props) => {
    const getTimeFormat = (index) => {
        if(index >= 12) {
            return `${index}:00 AM`
        } else {
            return `${index}:00 PM`
        }
    }
    const getColor = (index) => {
        var current = new Date();
        return current.getHours() === index ? '#8BC34A' : current.getHours() > index ? '#f44336' : '#78909C';
    }
    const getButtons = () => {
    return props.times.map((value, index) => <button className="HourButton" key={index} style={{backgroundColor: getColor(index)}}>{getTimeFormat(index)}</button>)
    }
    return getButtons()   
}

const mapStateToProps = state => {
    return {
      times: state.times
    }
}
  
  export default connect(mapStateToProps)(Hours);
  