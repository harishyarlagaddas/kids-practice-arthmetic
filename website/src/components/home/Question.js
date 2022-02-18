import React, { memo, useState } from 'react';
import { OPERATION_TYPE_SUBTRACTION, OPERATOR_ADDITION, OPERATOR_DIVISION, OPERATOR_MULTIPLICATION } from '../../constants/consts';
import './Question.css';

function Question(props) {
  const [result, setResult] = useState('')
  let resultDiv = null

  const handleKeyPress = (event) => {
    if(event.key === 'Enter' && result){
      handleSubmit(props, result);
      setResult('')
      resultDiv.focus()
    }
  }
  
  return (
    <div>
      <div className="question">
        <div className="questionItem questionItemBorder">
          {props.operand1}
        </div>

        <div className="questionItem">
          {props.operator}
        </div>

        <div className="questionItem questionItemBorder">
          {props.operand2}
        </div>

        <div className="questionItem">
          =
        </div>

        <input 
          className="questionItem questionItemBorder questionAnswer"
          autofocus="autofocus"
          ref={(input) => { resultDiv = input; }}
          value={result}
          onKeyPress={handleKeyPress}
          onChange={event => {
            if (!isNaN(event.target.value)) {
              setResult(event.target.value)
            } else {
              console.log('Entered value is not a number')
            }
          }}
        />
      </div>


      <button 
        className="submitButton"
        onClick={() => {
          handleSubmit(props, result)
          setResult('')
          resultDiv.focus()
        }}
        disabled={!result}>
          Submit
      </button>
    </div>
  );
}

function handleSubmit(props, result) {
  console.log('handleSubmit')
  props.onResult({
    operand1: props.operand1,
    operand2: props.operand2,
    operator: props.operator,
    answer: result,
    correctAnswer: getActualResult(props)
  });
}

function getActualResult(props) {
  var result = 0;
  if (props.operator === OPERATOR_ADDITION) {
    result = props.operand1 + props.operand2;
  } else if (props.operator === OPERATION_TYPE_SUBTRACTION) {
    result = props.operand1 - props.operand2;
  } else if (props.operator === OPERATOR_MULTIPLICATION) {
    result = props.operand1 * props.operand2;
  } else if (props.operator === OPERATOR_DIVISION) {
    result = props.operand1 / props.operand2
  }
  return result.toString();
}

export default memo(Question);
