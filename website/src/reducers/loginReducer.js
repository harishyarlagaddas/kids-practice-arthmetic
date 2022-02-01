import {
    ACTION_TYPE_LOGIN_REQUEST,
    ACTION_TYPE_LOGIN_RESPONSE,
    ACTION_TYPE_LOGIN_FAILURE,
    ACTION_TYPE_VALIDATE_ACCESS_TOKEN,
    ACTION_TYPE_INVALIDATE_ACCESS_TOKEN,
    ACTION_TYPE_SET_TO_VALIDATE_ACCESS_TOKEN
} from '../constants/actionTypes'

const initialState = {
    loggedIn: false,
    loginInProgress: false,
    loginFailureMsg: '',
    accessToken: null,
    validateAccessToken: true
}

export default function loginReducer(state=initialState, action) {
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
            return Object.assign({}, state, {
                loggedIn: true,
                loginInProgress: false,
                loginFailureMsg: null,
                accessToken: action.payload.accessToken,
                validateAccessToken: false
            })
        case ACTION_TYPE_LOGIN_FAILURE:
            return Object.assign({}, state, {
                loggedIn: false,
                loginInProgress: false,
                accessToken: null,
                loginFailureMsg: action.payload.errorMsg,
                validateAccessToken: false
            })
        case ACTION_TYPE_VALIDATE_ACCESS_TOKEN:
            return Object.assign({}, state, {
                loggedIn: true,
                loginInProgress: false,
                loginFailureMsg: null,
                validateAccessToken: false
            })
        case ACTION_TYPE_INVALIDATE_ACCESS_TOKEN:
            return Object.assign({}, state, {
                loggedIn: false,
                loginInProgress: false,
                loginFailureMsg: null,
                accessToken: null,
                validateAccessToken: false
            })
        case ACTION_TYPE_SET_TO_VALIDATE_ACCESS_TOKEN:
            return Object.assign({}, state, {
                validateAccessToken: true
            })
        default:
            return state

    }
}

export const loginError = state => state.login.loginFailureMsg
export const loginInProgress = state => state.login.loginInProgress
export const loggedIn = state => state.login.loggedIn
export const accessToken = state => state.login.accessToken
export const validateAccessToken = state => state.login.validateAccessToken