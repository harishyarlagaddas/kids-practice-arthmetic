import React, { useEffect, useState } from 'react'
import {Helmet} from 'react-helmet';
import AdditionHandler from './addition/AdditionHandler';
import AdditionSection from './addition/AdditionSection'
import DivisionHandler from './division/DivisionHandler';
import DivisionSection from './division/DivisionSection';
import MultiplicationHandler from './multiplication/MultiplicationHandler';
import MultiplicationSection from './multiplication/MultiplicationSection';
import SubtractionHandler from './subtraction/SubtractionHandler';
import SubtractionSection from './subtraction/SubtractionSection';
import './Home.css'
import { accessToken } from '../../features/login/loginSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
    const [screen, setScreen] = useState(0)
    const [digits, setDigits] = useState(1)
    const navigate = useNavigate();
    const token = useSelector(accessToken)
    console.log('token: '+token)
    
    if (screen === 1) {
        return renderAdditionScreen(digits, setScreen, setDigits);
    } else if (screen === 2) {
        return renderSubtractionScreen(digits, setScreen, setDigits);
    } else if (screen === 3) {
        return renderMultiplicationScreen(digits, setScreen, setDigits);
    } else if (screen === 4) {
        return renderDivisionScreen(digits, setScreen, setDigits);
    } else {
        return renderHomeScreen(token, setScreen, setDigits, navigate);
    }
}

function renderHomeScreen(token, setScreen, setDigits, navigate) {
    // let token = useSelector(accessToken)
    console.log('accesstoken: '+token)
    if (token) {
        return (
            <div >
                <div className="contentMain">
                    <Helmet>
                        <style>{'body { background-color: #E9E9E9; }'}</style>
                    </Helmet>
                    <AdditionSection 
                        handleAddition={
                            (digits) => {
                                setDigits(digits)
                                setScreen(1)
                            }
                        }
                    />
                    
                    <SubtractionSection 
                        handleSubtraction={
                            (digits) => {
                                setDigits(digits)
                                setScreen(2)
                            }
                        }
                    />

                    <MultiplicationSection 
                        handleMultiplication={
                            (digits) => {
                                setDigits(digits)
                                setScreen(3)
                            }
                        }
                    />

                    <DivisionSection 
                        handleDivision={
                            (digits) => {
                                setDigits(digits)
                                setScreen(4)
                            }
                        } 
                    />
                </div>
            </div>
            
        )
    } else {
        return <GoToLogin />
    }
    
}

function GoToLogin() {
    console.log("GoToLogin")
    const navigate = useNavigate()
    useEffect(() => {
        navigate("/login")
    }, [])
    return (<div></div>)
}

function renderAdditionScreen(digits, setScreen, setDigits) {
    return (
        <div>
            <AdditionHandler 
                totalQuestions="10" 
                digits={digits} 
                onHomeButtonPress={
                    () => {
                        setScreen(0)
                        setDigits(0)
                    }
                } />
        </div>
    )
}

function renderSubtractionScreen(digits, setScreen, setDigits) {
    return (
        <div>
            <SubtractionHandler 
                totalQuestions="10" 
                digits={digits} 
                onHomeButtonPress={
                    () => {
                        setScreen(0)
                        setDigits(0)
                    }
                }/>
        </div>
    )
}

function renderMultiplicationScreen(digits, setScreen, setDigits) {
    return (
        <div>
            <MultiplicationHandler 
                totalQuestions="10" 
                digits={digits} 
                onHomeButtonPress={
                    () => {
                        setScreen(0)
                        setDigits(0)
                    }
                }/>
        </div>
    )
}

function renderDivisionScreen(digits, setScreen, setDigits) {
    return (
        <div>
            <DivisionHandler 
                totalQuestions="10" 
                digits={digits} 
                onHomeButtonPress={
                    () => {
                        setScreen(0)
                        setDigits(0)
                    }
                }/>
        </div>
    )
}

export default Home