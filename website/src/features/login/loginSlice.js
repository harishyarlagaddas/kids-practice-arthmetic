/**
 * This file is not being used. Because using the createSlice there is difficulty in making redux-persist to work. if we can get the redux-persist to work 
 * with createSlice mentod then we can use this. Currently I am leaving this file just for the reference..
 */

import { createSlice } from "@reduxjs/toolkit";


export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        loggedIn: false,
        loginInProgress: false,
        loginFailureMsg: '',
        accessToken: null
    },
    
    reducers: {
        loginRequest: (state) => {
            console.log('loginRequest')
            state.loggedIn = false;
            state.loginInProgress = true
            state.loginFailureMsg = null
            state.accessToken = null
        },
        loginResponse: (state, action) => {
            console.log('loginResponse action: %s', JSON.stringify(action))
            state.loggedIn = true
            state.loginInProgress = false
            state.loginFailureMsg = null
            state.accessToken = action.payload.accessToken
            console.log('state.accessToken: '+state.accessToken)
        },
        loginFailure: (state, action) => {
            console.log('loginFailure. action: %s', JSON.stringify(action))
            state.loggedIn = false
            state.loginInProgress = false
            state.accessToken = null
            state.loginFailureMsg = action.payload.errorMsg
        },
        accessTokenValid: (state) => {
            console.log('accessTokenValid')
            state.loggedIn = true
            state.loginInProgress = false;
            state.loginFailureMsg = null
        },
        accessTokenInvalid: (state) => {
            console.log('accessTokenInvalid')
            state.loggedIn = false;
            state.loginInProgress = false;
            state.loginFailureMsg = null;
            state.accessToken = null
        }
    }
})

export const { loginRequest, loginResponse, loginFailure, accessTokenValid, accessTokenInvalid } = loginSlice.actions
export default loginSlice.reducer

export const loginError = state => state.login.loginFailureMsg
export const loginInProgress = state => state.login.loginInProgress
export const loggedIn = state => state.login.loggedIn
export const accessToken = state => state.login.accessToken;