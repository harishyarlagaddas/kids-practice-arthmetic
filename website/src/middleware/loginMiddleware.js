import axios from "axios"
import {
    loginResponseAction,
    loginFailureAction,
    invalidateAccessTokenAction
} from '../actions/actions'

import {
    ACTION_TYPE_LOGIN_REQUEST,
    ACTION_TYPE_SET_TO_VALIDATE_ACCESS_TOKEN
} from '../constants/actionTypes'

export const loginMiddleware = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === ACTION_TYPE_LOGIN_REQUEST) {
        console.log(action)
        const { userName, password } = action.loginDetails
        console.log('doLogin userName: %s', userName)
        
        const postBody = {
            userName: userName,
            password: password
        }

        // const axiosInstance = axios.create({
        // })
        
        // axiosInstance.post(LOGIN_URL, postBody)
        //     .then(data => {
        //         console.log('login request successfyk. response: %s', postBody)
        //         dispatch(loginResponse ({
        //             response: data
        //         }))
        //     })
        //     .catch(error => {
        //         console.log('login error. error: %s', error)
        //         dispatch(loginFailure({
        //             error: error
        //         }))
        //     })

        setTimeout(() => {
            console.log("sending login response..")
            dispatch(loginResponseAction({
                accessToken: "DummyToken"
            }))
        }, 5000)
        console.log('doLogin Out')
    } else if (action.type == ACTION_TYPE_SET_TO_VALIDATE_ACCESS_TOKEN) {
        console.log(action)
        setTimeout(() => {
            console.log('sending accesstoken valid response')
            dispatch(invalidateAccessTokenAction())
        }, 5000)
    }
}