import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux';
import { getAllTestsAction } from "../actions/actions";
import { 
    GET_TESTS_REFRESH_INTERVAL, 
    OPERATION_TYPE_ADDITION, 
    OPERATION_TYPE_DIVISION, 
    OPERATION_TYPE_MULTIPLICATION, 
    OPERATION_TYPE_SUBTRACTION 
} from "../constants/consts";
import { apiCallInProgress, lastTimeTestsRetrieved, selectedKidInfo } from "../reducers/accountReducer";
import { accessToken, loggedIn } from "../reducers/loginReducer";
import Progressbar from "../components/progress-bar/Progressbar";
import ResultsSection from "../components/my-results/ResultsSection";
import './MyResults.css'
import { useNavigate } from "react-router-dom";

export default function MyResults(props) {
    const isLoggedIn = useSelector(loggedIn)
    const selectedKid = useSelector(selectedKidInfo)
    const access_token = useSelector(accessToken)
    const inProgress = useSelector(apiCallInProgress)
    const lastTestsRetrievedTime = useSelector(lastTimeTestsRetrieved)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isLoggedIn && (!lastTestsRetrievedTime || Date.now()-lastTestsRetrievedTime > GET_TESTS_REFRESH_INTERVAL)) {
            console.log('Retrieving the tests. lastTestsRetrievedTime: '+lastTestsRetrievedTime)
            dispatch(getAllTestsAction(access_token, selectedKid.kidsId))
        } else {
            console.log('Not retrieving the tests because the lastTestsRetrivedTime: '+lastTestsRetrievedTime+' is less than '+GET_TESTS_REFRESH_INTERVAL+'ms')
        }
    }, [])

    if (!isLoggedIn) {
        return <GoToLogin />
    }

    if (inProgress) {
        return <Progressbar />
    } else {
        return (
            <div className="myResultsContainer"> 
                <Helmet>
                    <style>{'body { background-color: #E9E9E9; }'}</style>
                </Helmet>
                <div className="myResultsTitle">My Results</div>
                <div className="myResultsMain">
                    <ResultsSection operation={OPERATION_TYPE_ADDITION}/>
                    <ResultsSection operation={OPERATION_TYPE_SUBTRACTION}/>
                    <ResultsSection operation={OPERATION_TYPE_MULTIPLICATION}/>
                    <ResultsSection operation={OPERATION_TYPE_DIVISION}/>
                </div>
            </div>
        )
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