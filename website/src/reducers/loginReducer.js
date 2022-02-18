import {
    ACTION_TYPE_LOGIN_REQUEST,
    ACTION_TYPE_LOGIN_RESPONSE,
    ACTION_TYPE_LOGIN_FAILURE,
    ACTION_TYPE_ACCESS_TOKEN_VALID,
    ACTION_TYPE_ACCESS_TOKEN_INVALID,
    ACTION_TYPE_VALIDATE_ACCESS_TOKEN,
    ACTION_TYPE_LOG_OUT
} from '../constants/actionTypes'

const initialState = {
    loggedIn: false,
    loginInProgress: false,
    loginFailureMsg: '',
    accessToken: null,
    validateAccessToken: false
}

export default function loginReducer(state=initialState, action) {
    console.log('loginReducer action: '+action.type)
    switch(action.type) {
        case ACTION_TYPE_LOGIN_REQUEST:
            return Object.assign({}, state, {
                loggedIn: false,
                loginInProgress: true,
                loginFailureMsg: null,
                accessToken: null,
                validateAccessToken: false
            })
        case ACTION_TYPE_LOGIN_RESPONSE:
            console.log(action.response)
            return Object.assign({}, state, {
                loggedIn: true,
                loginInProgress: false,
                loginFailureMsg: null,
                accessToken: action.response.accessToken,
                validateAccessToken: false
            })
        case ACTION_TYPE_LOGIN_FAILURE:
            console.log(action.response)
            return Object.assign({}, state, {
                loggedIn: false,
                loginInProgress: false,
                accessToken: null,
                loginFailureMsg: action.response.errorDescription,
                validateAccessToken: false
            })
        case ACTION_TYPE_ACCESS_TOKEN_VALID:
            console.log(action.response)
            return Object.assign({}, state, {
                loggedIn: true,
                loginInProgress: false,
                loginFailureMsg: null,
                accessToken: action.response.accessToken
            })
        case ACTION_TYPE_ACCESS_TOKEN_INVALID:
            return Object.assign({}, state, {
                loggedIn: false,
                loginInProgress: false,
                loginFailureMsg: null,
                accessToken: null,
            })
        case ACTION_TYPE_VALIDATE_ACCESS_TOKEN:
            return Object.assign({}, state, {
                loggedIn: false,
                loginInProgress: true
            })
        case ACTION_TYPE_LOG_OUT:
            return Object.assign({}, state, {
                loggedIn: false,
                accessToken: null
            })
        default:
            return state

    }
}

export const loginError = state => state.login.loginFailureMsg
export const loginInProgress = state => state.login.loginInProgress
export const loggedIn = state => state.login.loggedIn
export const accessToken = state => state.login.accessToken