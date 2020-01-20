import React from 'react';
import "Survey.css";

function Radio(props) {
    return <li>
        <div><input type="radio" class="questionRadio"/><br/><label>{props.label}</label></div>
    </li>;
}

function Question(props) {
    let divClassName;
    if (props.active) {
        divClassName = "question active";
    } else {
        divClassName = "question";
    }
    return (
        <div className={divClassName}>
            <h3>{props.questionText}</h3><br/>
            <div className="questionInteraction">
                <span>({props.minDescription})</span>
                <ul className="radios">
                    <Radio label="0"/>
                    <Radio label="1"/>
                    <Radio label="2"/>
                    <Radio label="3"/>
                    <Radio label="4"/>
                    <Radio label="5"/>
                    <Radio label="6"/>
                    <Radio label="7"/>
                </ul>
                <span>({props.maxDescription})</span>
            </div>
        </div>
    );
}

function Survey() {
    return (
        <ol id="question-list">
            <li><Question questionText="How would you describe your pain level?" minDescription="No pain"
                          maxDescription="Worst pain you've ever felt"/></li>
            <li><Question questionText="How would you describe your pain level?" minDescription="No pain"
                          maxDescription="Worst pain you've ever felt" active/></li>
            <li><Question questionText="How would you describe your pain level?" minDescription="No pain"
                          maxDescription="Worst pain you've ever felt"/></li>
        </ol>
    );
}

function FullSurvey() {
    return (<div>
        <h1>Survey</h1>
        <Survey/>
    </div>);
}

export default FullSurvey;
