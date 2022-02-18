import React, { useEffect, useState } from 'react'
import {Helmet} from 'react-helmet';
import OperationHandler from './OperationHandler';
import './Home.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { OPERATION_TYPE_ADDITION, OPERATION_TYPE_DIVISION, OPERATION_TYPE_MULTIPLICATION, OPERATION_TYPE_SUBTRACTION, OPERATOR_ADDITION, OPERATOR_DIVISION, OPERATOR_MULTIPLICATION, OPERATOR_SUBTRACTION } from '../../constants/consts';
import { loggedIn } from '../../reducers/loginReducer';
import { clearStateAction } from '../../actions/actions';
import ContentSection from './ContentSection';

const NUM_OF_QUESTIONS = 20

function Home() {
    const [operation, setOperation] = useState('')
    const [operand1MaxVal, setOperand1MaxVal] = useState(0)
    const [operand2MaxVal, setOperand2MaxVal] = useState(0)

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(loggedIn)
    
    //Clear the states
    dispatch(clearStateAction())

    if (!isLoggedIn) {
        return <GoToLogin />
    } else if (operation === OPERATION_TYPE_ADDITION) {
        return renderAdditionScreen(setOperation, operand1MaxVal, operand2MaxVal);
    } else if (operation === OPERATION_TYPE_SUBTRACTION) {
        return renderSubtractionScreen(setOperation, operand1MaxVal, operand2MaxVal);
    } else if (operation === OPERATION_TYPE_MULTIPLICATION) {
        return renderMultiplicationScreen(setOperation, operand1MaxVal, operand2MaxVal);
    } else if (operation === OPERATION_TYPE_DIVISION) {
        return renderDivisionScreen(setOperation, operand1MaxVal, operand2MaxVal);
    } else {
        return renderHomeScreen(setOperation, setOperand1MaxVal, setOperand2MaxVal);
    }
}

function renderHomeScreen(setOperation, setOperand1MaxVal, setOperand2MaxVal) {
    
    return (
        <div>
            <div className="contentMain">
                <Helmet>
                    <style>{'body { background-color: #E9E9E9; }'}</style>
                </Helmet>
                <ContentSection 
                    operation = {OPERATION_TYPE_ADDITION}
                    handleOperation = {
                        (operand1MaxValue, operand2MaxValue) => {
                            setOperand1MaxVal(operand1MaxValue)
                            setOperand2MaxVal(operand2MaxValue)
                            setOperation(OPERATION_TYPE_ADDITION)
                        }
                    }
                />
                
                <ContentSection
                    operation = {OPERATION_TYPE_SUBTRACTION}
                    handleOperation = {
                        (operand1MaxValue, operand2MaxValue) => {
                            setOperand1MaxVal(operand1MaxValue)
                            setOperand2MaxVal(operand2MaxValue)
                            setOperation(OPERATION_TYPE_SUBTRACTION)
                        }
                    }
                />

                <ContentSection
                    operation = {OPERATION_TYPE_MULTIPLICATION} 
                    handleOperation = {
                        (operand1MaxValue, operand2MaxValue) => {
                            setOperand1MaxVal(operand1MaxValue)
                            setOperand2MaxVal(operand2MaxValue)
                            setOperation(OPERATION_TYPE_MULTIPLICATION)
                        }
                    }
                />

                <ContentSection
                    operation = {OPERATION_TYPE_DIVISION} 
                    handleOperation = {
                        (operand1MaxValue, operand2MaxValue) => {
                            setOperand1MaxVal(operand1MaxValue)
                            setOperand2MaxVal(operand2MaxValue)
                            setOperation(OPERATION_TYPE_DIVISION)
                        }
                    } 
                />
            </div>
        </div>
    )
}

function GoToLogin() {
    console.log("GoToLogin")
    const navigate = useNavigate()
    useEffect(() => {
        navigate("/login")
    }, [])
    return (<div></div>)
}

function renderAdditionScreen(setOperation, operand1, operand2) {
    return (
        <div>
            <OperationHandler 
                totalQuestions={NUM_OF_QUESTIONS} 
                operand1MaxVal={operand1}
                operand2MaxVal={operand2} 
                operator={OPERATOR_ADDITION}
                operation={OPERATION_TYPE_ADDITION}
                onHomeButtonPress={
                    () => {
                        setOperation('')
                    }
                } />
        </div>
    )
}

function renderSubtractionScreen(setOperation, operand1, operand2) {
    return (
        <div>
            <OperationHandler 
                totalQuestions={NUM_OF_QUESTIONS} 
                operand1MaxVal={operand1}
                operand2MaxVal={operand2}
                operator={OPERATOR_SUBTRACTION}
                operation={OPERATION_TYPE_SUBTRACTION}
                onHomeButtonPress={
                    () => {
                        setOperation('')
                    }
                }/>
        </div>
    )
}

function renderMultiplicationScreen(setOperation, operand1, operand2) {
    return (
        <div>
            <OperationHandler 
                totalQuestions={NUM_OF_QUESTIONS}
                operand1MaxVal={operand1}
                operand2MaxVal={operand2}
                operator={OPERATOR_MULTIPLICATION}
                operation={OPERATION_TYPE_MULTIPLICATION}
                onHomeButtonPress={
                    () => {
                        setOperation('')
                    }
                }/>
        </div>
    )
}

function renderDivisionScreen(setOperation, operand1, operand2) {
    return (
        <div>
            <OperationHandler 
                totalQuestions={NUM_OF_QUESTIONS}
                operand1MaxVal={operand1}
                operand2MaxVal={operand2}
                operator={OPERATOR_DIVISION}
                operation={OPERATION_TYPE_DIVISION}
                onHomeButtonPress={
                    () => {
                        setOperation('')
                    }
                }/>
        </div>
    )
}

export default Home