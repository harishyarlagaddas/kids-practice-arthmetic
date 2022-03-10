import axios from "axios"
import {
    loginResponseAction,
    loginFailureAction,
    accessTokenInvalidAction,
    updateAccountInformationAction,
    accessTokenValidAction,
    clearAccountInformationAction,
    changePasswordFailureAction,
    changePasswordSuccessfulAction,
    requestTemporaryAuthCodeActionSuccessfulAction,
    requestTemporaryAuthCodeActionFailureAction
} from '../actions/actions'

import {
    ACTION_TYPE_CHANGE_PASSWORD,
    ACTION_TYPE_LOGIN_REQUEST,
    ACTION_TYPE_REQUEST_TEMPORARY_AUTH_CODE,
    ACTION_TYPE_VALIDATE_ACCESS_TOKEN
} from '../constants/actionTypes'
import { ACCESS_TOKEN_URL, CHANGE_PASSWORD_URL, HEADER_KEY_AUTHORIZATION, LOGIN_URL, REQUEST_TEMPORARY_AUTH_CODE } from "../constants/serverConsts";

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
                dispatch(accessTokenInvalidAction())
                dispatch(clearAccountInformationAction())
            })
        console.log('validating accesstoken out ')
    } else if (action.type === ACTION_TYPE_CHANGE_PASSWORD) {
        console.log('accountMiddleware action: '+JSON.stringify(action))
        const axiosInstance = axios.create({})

        const postBody = {
            newPassword: action.newPassword
        }

        if (action.temporaryAuthCode) {
            postBody['temporaryAuthCode'] = action.temporaryAuthCode
        } else {
            postBody['password'] = action.password
        }

        if (action.userName) {
            postBody['userName'] = action.userName
        }

        let config = null
        if (action.accessToken) {
            config = {
                headers: {
                    [HEADER_KEY_AUTHORIZATION]: action.accessToken
                }
            }
        }

        axiosInstance.post(CHANGE_PASSWORD_URL, postBody, config)
            .then(response => {
                console.log('change password successful. response: %s', JSON.stringify(response))
                dispatch(changePasswordSuccessfulAction())
            })
            .catch(error => {
                console.log('change password request request error. error: %s', error)
                if (error.response) {
                    dispatch(changePasswordFailureAction(error.response.data))
                } else {
                    dispatch(changePasswordFailureAction({
                        errorDescription: 'Network error. Please try again...'
                    }))
                }
            })
        console.log('change password out ')
    } else if (action.type === ACTION_TYPE_REQUEST_TEMPORARY_AUTH_CODE) {
        console.log('accountMiddleware action: '+JSON.stringify(action))
        const axiosInstance = axios.create({})

        const postBody = {
            userName: action.userName
        }

        axiosInstance.post(REQUEST_TEMPORARY_AUTH_CODE, postBody)
            .then(response => {
                console.log('Request temp auth code successful. response: %s', JSON.stringify(response))
                dispatch(requestTemporaryAuthCodeActionSuccessfulAction())
            })
            .catch(error => {
                console.log('Request temp auth code request request error. error: %s', error)
                if (error.response) {
                    dispatch(requestTemporaryAuthCodeActionFailureAction(error.response.data))
                } else {
                    dispatch(requestTemporaryAuthCodeActionFailureAction({
                        errorDescription: 'Network error. Please try again...'
                    }))
                }
            })
        console.log('Request temp auth code out ')
    }
}