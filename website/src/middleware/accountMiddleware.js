import axios from "axios";
import { addNewKidFailureAction, addNewKidSuccessfulAction, addNewTestFailureAction, addNewTestSuccessAction, getAllTestsAction, getAllTestsFailureAction, getAllTestsSuccessAction } from "../actions/actions";
import { ACTION_TYPE_ADD_NEW_KID, ACTION_TYPE_ADD_NEW_TEST, ACTION_TYPE_GET_ALL_TESTS } from "../constants/actionTypes";
import { ADD_KID_URL, HEADER_KEY_AUTHORIZATION, QUERY_PARAMS_KEY_KIDS_ID, TESTS_URL } from "../constants/serverConsts";

export const accountMiddleware = ({ dispatch }) => next => action => {
    next(action);
    if (action.type == ACTION_TYPE_ADD_NEW_TEST) {
        console.log('accountMiddleware action: '+JSON.stringify(action))

        const axiosInstance = axios.create({
        })
        
        let config = {
            headers: {
                Authorization: action.accessToken,
            }
        }
        axiosInstance.post(TESTS_URL, action.testInformation, config)
            .then(response => {
                console.log('tests request successful. response: %s', JSON.stringify(response))
                dispatch(addNewTestSuccessAction(action.testInformation))
            })
            .catch(error => {
                console.log('tests request error. error: %s', error)
                if (error.response) {
                    dispatch(addNewTestFailureAction(error.response))
                } else {
                    dispatch(addNewTestFailureAction({
                        errorDescription: 'NetworkError while storing the test...'
                    }))
                }
            })
        console.log('accountMiddleware post tests Out')
    } else if (action.type == ACTION_TYPE_GET_ALL_TESTS) {
        console.log('accountMiddleware action: '+JSON.stringify(action))
        const axiosInstance = axios.create({})

        let config = {
            headers: {
                [HEADER_KEY_AUTHORIZATION]: action.accessToken
            },
            params: {
                [QUERY_PARAMS_KEY_KIDS_ID]: action.kidsId 
            }
        }

        axiosInstance.get(TESTS_URL, config)
            .then(response => {
                console.log('tests get request sucessful. response: %s', JSON.stringify(response))
                dispatch(getAllTestsSuccessAction(response.data))
            })
            .catch(error => {
                console.log('tests get request error. Error: %s', error)
                dispatch(getAllTestsFailureAction(error))
            })
        console.log('accountMiddleware get tests Out')
    } else if (action.type === ACTION_TYPE_ADD_NEW_KID) {
        console.log('accountMiddleware action: '+JSON.stringify(action))
        const axiosInstance = axios.create({})

        const postBody = {
            kidsName: action.kidsName
        }

        let config = {
            headers: {
                [HEADER_KEY_AUTHORIZATION]: action.accessToken
            }
        }

        axiosInstance.post(ADD_KID_URL, postBody, config)
            .then(response => {
                console.log('add kid request successful. response: %s', JSON.stringify(response))
                dispatch(addNewKidSuccessfulAction(response.data))
            })
            .catch(error => {
                console.log('add kid request request error. error: %s', error)
                if (error.response) {
                    dispatch(addNewKidFailureAction(error.response.data))
                } else {
                    dispatch(addNewKidFailureAction('Network error. Please try again...'))
                }
            })
        console.log('add Kid out ')
    }
}