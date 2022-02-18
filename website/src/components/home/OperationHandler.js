import React, { useEffect, useState } from 'react'
import './OperationHandler.css'
import Question from './Question';
import QuestionHeader from './QuestionHeader';
import ResultsTable from '../common/ResultsTable';
import { useDispatch, useSelector } from 'react-redux';
import { apiCallComplete, apiCallFailureMsg, apiCallInProgress, selectedKidInfo } from '../../reducers/accountReducer';
import Progressbar from '../progress-bar/Progressbar';
import { addNewTestAction, clearStateAction } from '../../actions/actions';
import { 
    JSON_KEY_CORRECT_ANSWERS, 
    JSON_KEY_KIDS_ID, 
    JSON_KEY_OPERAND1_MAX_VALUE, 
    JSON_KEY_OPERAND2_MAX_VALUE, 
    JSON_KEY_OPERATION, 
    JSON_KEY_QUESTIONS, 
    JSON_KEY_QUESTION_ANSWER, 
    JSON_KEY_QUESTION_CORRECT_ANSWER, 
    JSON_KEY_QUESTION_OPERAND_1, 
    JSON_KEY_QUESTION_OPERAND_2, 
    JSON_KEY_QUESTION_OPERATOR, 
    JSON_KEY_TEST_TIME, 
    JSON_KEY_TIME_TAKEN, 
    JSON_KEY_TOTAL_QUESTIONS 
} from '../../constants/jsonKeys';
import { accessToken } from '../../reducers/loginReducer';
import { OPERATION_TYPE_DIVISION, OPERATOR_DIVISION } from '../../constants/consts';

export default function OperationHandler(props) {
    const [questions, setQuestions] = useState([])
    const [currentQuestionNum, setCurrentQuestionNum] = useState(1)
    const [time, setTime] = useState('00:00')
    const inProgress = useSelector(apiCallInProgress)
    const dispatch = useDispatch()
    const kidSelected = useSelector(selectedKidInfo)
    const access_token = useSelector(accessToken)
    const apiCallComplated = useSelector(apiCallComplete)
    
    const onBackButtonEvent = (e) => {
        console.log('OperationHandler onBackButtonEvent')
        dispatch(clearStateAction())
    }

    useEffect(() => {
        window.addEventListener('popstate', onBackButtonEvent)
        return (() => {
            window.removeEventListener('popstate', onBackButtonEvent)
        })
    })

    console.log('OperationHandler IN')

    if (inProgress) {
        return (
            <Progressbar />
        )
    } else if (apiCallComplated) {
        return (
            <RenderCompleted 
                questions={questions}
                operation={props.operation}
                onHomeButtonPress={props.onHomeButtonPress}
            />
        )
    } else if (currentQuestionNum > props.totalQuestions) {
        const testInfo = {
            [JSON_KEY_KIDS_ID]: kidSelected.kidsId,
            [JSON_KEY_OPERATION]: props.operation,
            [JSON_KEY_TEST_TIME]: Date.now(),
            [JSON_KEY_TIME_TAKEN]: time,
            [JSON_KEY_OPERAND1_MAX_VALUE]: props.operand1MaxVal,
            [JSON_KEY_OPERAND2_MAX_VALUE]: props.operand2MaxVal
        }
        var testQuestions = []
        var correctAnswers = 0;
        questions.forEach(question => {
            const qq = {
                [JSON_KEY_QUESTION_OPERAND_1]: question.operand1,
                [JSON_KEY_QUESTION_OPERAND_2]: question.operand2,
                [JSON_KEY_QUESTION_OPERATOR]: question.operator,
                [JSON_KEY_QUESTION_ANSWER]: question.answer,
                [JSON_KEY_QUESTION_CORRECT_ANSWER]: question.correctAnswer
            }
            if (question.answer == question.correctAnswer) {
                correctAnswers++
            }
            testQuestions.push(qq)
        });
        testInfo[JSON_KEY_CORRECT_ANSWERS] = correctAnswers
        testInfo[JSON_KEY_TOTAL_QUESTIONS] = props.totalQuestions
        testInfo[JSON_KEY_QUESTIONS] = testQuestions
        console.log('sending new test action')
        dispatch(addNewTestAction(access_token, testInfo))
    } else {
        var operand1 = randomIntFromInterval(2, props.operand1MaxVal)
        var operand2 = randomIntFromInterval(2, props.operand2MaxVal)
        
        // Make sure operand1 > operand2
        if (operand1 < operand2) {
            var temp = operand1;
            operand1 = operand2;
            operand2 = temp;
        }

        if (props.operator === OPERATOR_DIVISION) {
            var temp = randomIntFromInterval(2, operand1/operand2)
            operand1 = operand2 * temp
        }

        return (
            <RenderQuestion 
                operand1={operand1}
                operand2={operand2}
                operator={props.operator}
                operation={props.operation}
                totalQuestions={props.totalQuestions}
                setQuestions={setQuestions}
                currentQuestionNum={currentQuestionNum}
                setCurrentQuestionNum={setCurrentQuestionNum}
                setTime={setTime}
            />
        )
    }
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function RenderQuestion(props) {
    const [time, setTime] = useState('00:00')

    return (
        <div>
            <QuestionHeader 
                questionType={props.operation} 
                questionNum={props.currentQuestionNum} 
                totalQuestions={props.totalQuestions}
                setTime={setTime}
            />

            <Question 
                operand1={props.operand1} 
                operand2={props.operand2} 
                operator={props.operator}
                onResult={(question) => {
                    props.setQuestions(questions => [...questions, question])
                    props.setCurrentQuestionNum(props.currentQuestionNum+1)
                    props.setTime(time)
                }}
            />
        </div>
    )
}

function RenderCompleted(props) {
    const dispatch = useDispatch()
    const apiErrorMsg = useSelector(apiCallFailureMsg)
    return (
        <div>
            <div className="completedText">
            &#128079; &#x1F44F; Welldone. You completed the {props.operation} practice excercise. &#128079; &#x1F44F;
            </div>
            <div className="operationHandlerErrorMsg">{apiErrorMsg}</div>
            <button className="operationHandlerButton" onClick={
                () => {
                    dispatch(clearStateAction())
                    props.onHomeButtonPress()
                }
            }>
                Go Home
            </button>
            <ResultsTable questions={props.questions} />
        </div>
    )
}