import React from 'react';
import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'

const DisplayMardown = (props) => {
    const generateScrum = () => {
        let markdown = "# Scrum Report"
        
        const date = new Date();
        let time;
        for(time in props.times) {
            if(props.times[time].text) {
                markdown += `\n ## ${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-Hour: ${time}`
                markdown += `\n ${props.times[time].text}`
            }
        }
        markdown += "<br/> <br/>"
        props.setMdText(markdown)
        return markdown;
    }
    return (
        <div>
            <ReactMarkdown
                source={generateScrum()}
                escapeHtml={false}
            />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        times: state.times
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setMdText: (text) => dispatch({type: 'SETMDTEXT', text: text})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayMardown);