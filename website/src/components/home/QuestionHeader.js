import React from 'react'

import './QuestionHeader.css'
import Timer from './Timer'

function QuestionHeader(props) {
    return (
        <div className="header">
          <div className="headerItem">
            {props.questionType}
          </div>
          <div className="headerItem">
            {props.questionNum}/{props.totalQuestions}
          </div>
          <div className="headerItem">
            <Timer setTime={props.setTime}/>
          </div>
        </div>
    )
}

export default QuestionHeader