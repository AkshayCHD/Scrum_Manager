import * as React from 'react'
import { connect } from 'react-redux'
import './ScrumInput.css'
const ScrumInput = (props) => {
    const handleChange = (e) => {
        const current = new Date();
        props.addText(current.getHours(), e.target.value);
    }
    return (
        <div className='InputContainer'>
            <textarea onChange={handleChange} placeholder="enter text here" className='Input' />
        </div>
    )
}

const mapStateToProps = state => {
    return {
      times: state.times,
      ctr: state.ctr
    }
  }

const mapDispatchToProps = dispatch => {
    return {
      addText: (index, text) => dispatch({type: 'ADDTEXT', index: index, text: text})
    }
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(ScrumInput)