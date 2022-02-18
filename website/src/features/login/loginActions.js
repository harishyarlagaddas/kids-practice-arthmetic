/**
 * We are not using the methods defined in this file. Because we are not using loginSlice implementation, we are defining the login middleware to do the 
 * login tasks. Leaving this file just for the reference..
 */
import axios from "axios"
// import { accessTokenInvalid, accessTokenValid, loginFailure, loginRequest, loginResponse } from "./loginSlice"
import * as actions from '../../actions/actions'

const BASE_URL = 'https://esesvcjbv0.execute-api.us-west-2.amazonaws.com/Prod/restro'
const LOGIN_URL = BASE_URL+`/login`
const ACCESSTOKEN_VALIDATION_URL = BASE_URL+'valid?access_token='

const axiosInstance = axios.create({

})

export const isValidAccessToken = accessToken => {
    return (dispatch, getState) => {
        console.log('isValidAccessToken')
        setTimeout(() => {
            dispatch(actions.validateAccessTokenAction())
        }, 5000);
        // axiosInstance.get(ACCESSTOKEN_VALIDATION_URL+accessToken)
        //     .then(response => {
        //         dispatch(accessTokenValid());
        //     })
        //     .catch(error => {
        //         dispatch(accessTokenInvalid());
        //     })
        console.log('isValidAccessToken Out')
    }
}

export const doLogin = (userName, password) => {
    return (dispatch, getState) => {
        console.log('doLogin userName: %s', userName)
        dispatch(actions.loginRequestAction())

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
            dispatch(actions.loginResponseAction({
                accessToken: "DUMMY ACCESS TOKEN"
            }))
        }, 5000)
        console.log('doLogin Out')
    }
}