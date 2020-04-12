import React from 'react';
import PropTypes from 'prop-types';

function AnswerOption(props) {
console.log("answeroption the props: ",props);

let selected = false;
let selectedAnswers = null;
let answerType = "Microsoft";
if(props.result){
   selectedAnswers = props.result.map((item)=>{
    return item.selectedAnswer;
  });
  
  if(selectedAnswers.indexOf(props.answerContent) === -1)
  {
    selected = false;
  }
  else{
    selected = true;
  }
}

let inputOption;

if(selected){
  console.log("selected  props 1111 ",props, selected);
  inputOption = (
    <input
    type="radio"
    className="radioCustomButton"
    name="radioGroup"        
    id={props.answerContent}
    value={props.answerContent}
    disabled={props.answer}
    onChange={props.onAnswerSelected}
    checked={true}
    />
  );
} else {

  inputOption = (
    <input
    type="radio"
    className="radioCustomButton"
    name="radioGroup" 
    id={props.answerContent}
    value={props.answerContent}
    disabled={false}
    onChange={props.onAnswerSelected}   
  />
  );
}
  console.log("selected",selected);
  return (
    <li className="answerOption">
     {inputOption}
      <label className="radioCustomLabel" htmlFor={props.answerType}>
        {props.answerContent}
      </label>
    </li>
  );
}



export default AnswerOption;
