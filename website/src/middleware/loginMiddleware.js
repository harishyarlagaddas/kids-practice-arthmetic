import axios from "axios"
import {
    loginResponseAction,
    loginFailureAction,
    accessTokenInvalidAction,
    updateAccountInformationAction,
    accessTokenValidAction
} from '../actions/actions'

import {
    ACTION_TYPE_LOGIN_REQUEST,
    ACTION_TYPE_VALIDATE_ACCESS_TOKEN
} from '../constants/actionTypes'
import { ACCESS_TOKEN_URL, LOGIN_URL } from "../constants/serverConsts";

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

        const axiosInstance = axios.create({
        })
        
        axiosInstance.post(LOGIN_URL, postBody)
            .then(response => {
                console.log('login request successful. response: %s', JSON.stringify(response))
                dispatch(loginResponseAction(response.data))
                dispatch(updateAccountInformationAction(response.data))
            })
            .catch(error => {
                console.log('login error. error: %s', error)
                if (error.response) {
                    dispatch(loginFailureAction(error.response.data))
                } else {
                    dispatch(loginFailureAction({
                        errorDescription: "Network Exception. Please try again later..."
                    }))
                }
            })
        console.log('doLogin Out')
    } else if (action.type == ACTION_TYPE_VALIDATE_ACCESS_TOKEN) {
        const access_token = action.accessToken
        console.log('validating accesstoken: '+access_token)
        
        const postBody = {
            accessToken: access_token
        }

        const axiosInstance = axios.create({
        })
        
        axiosInstance.post(ACCESS_TOKEN_URL, postBody)
            .then(response => {
                console.log('validate accessToken request successful. response: %s', JSON.stringify(response))
                dispatch(accessTokenValidAction(response.data))
            })
            .catch(error => {
                console.log('validate accessToken request error. error: %s', error)
                if (error.response) {
                    dispatch(accessTokenInvalidAction())
                } else {
                    dispatch(accessTokenInvalidAction())
                }
            })
        console.log('validating accesstoken out ')
    }
}