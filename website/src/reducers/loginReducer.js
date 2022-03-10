import {
    ACTION_TYPE_LOGIN_REQUEST,
    ACTION_TYPE_LOGIN_RESPONSE,
    ACTION_TYPE_LOGIN_FAILURE,
    ACTION_TYPE_ACCESS_TOKEN_VALID,
    ACTION_TYPE_ACCESS_TOKEN_INVALID,
    ACTION_TYPE_VALIDATE_ACCESS_TOKEN,
    ACTION_TYPE_LOG_OUT,
    ACTION_TYPE_CLEAR_STATE,
    ACTION_TYPE_CHANGE_PASSWORD,
    ACTION_TYPE_CHANGE_PASSWORD_SUCCESSFUL,
    ACTION_TYPE_CHANGE_PASSWORD_FAILURE,
    ACTION_TYPE_REQUEST_TEMPORARY_AUTH_CODE,
    ACTION_TYPE_REQUEST_TEMPORARY_AUTH_CODE_SUCCESS,
    ACTION_TYPE_REQUEST_TEMPORARY_AUTH_CODE_FAILURE
} from '../constants/actionTypes'

const initialState = {
    loggedIn: false,
    authenticationApiInProgress: false,
    authenticationApiFailureMsg: '',
    authenticationApiCompleted: false,
    accessTokenVerificationInProgress: false,
    accessToken: null,
    validateAccessToken: false
}

export default function loginReducer(state=initialState, action) {
    console.log('loginReducer action: '+action.type)
    switch(action.type) {
        case ACTION_TYPE_LOGIN_REQUEST:
            return Object.assign({}, state, {
                loggedIn: false,
                authenticationApiInProgress: true,
                authenticationApiFailureMsg: null,
                authenticationApiCompleted: false,
                accessToken: null,
                validateAccessToken: false
            })
        case ACTION_TYPE_LOGIN_RESPONSE:
            console.log(action.response)
            return Object.assign({}, state, {
                loggedIn: true,
                authenticationApiInProgress: false,
                authenticationApiFailureMsg: null,
                authenticationApiCompleted: true,
                accessToken: action.response.accessToken,
                validateAccessToken: false
            })
        case ACTION_TYPE_LOGIN_FAILURE:
            console.log(action.response)
            return Object.assign({}, state, {
                loggedIn: false,
                authenticationApiInProgress: false,
                accessToken: null,
                authenticationApiFailureMsg: action.response.errorDescription,
                authenticationApiCompleted: true,
                validateAccessToken: false
            })
        case ACTION_TYPE_VALIDATE_ACCESS_TOKEN:
            return Object.assign({}, state, {
                loggedIn: false,
                authenticationApiInProgress: true,
                authenticationApiCompleted: false,
                accessTokenVerificationInProgress: true
            })
        case ACTION_TYPE_ACCESS_TOKEN_VALID:
            console.log(action.response)
            return Object.assign({}, state, {
                loggedIn: true,
                authenticationApiInProgress: false,
                authenticationApiFailureMsg: null,
                authenticationApiCompleted: true,
                accessTokenVerificationInProgress: false,
                accessToken: action.response.accessToken
            })
        case ACTION_TYPE_ACCESS_TOKEN_INVALID:
            return Object.assign({}, state, {
                loggedIn: false,
                authenticationApiInProgress: false,
                authenticationApiFailureMsg: null,
                authenticationApiCompleted: true,
                accessTokenVerificationInProgress: false,
                accessToken: null,
            })
        case ACTION_TYPE_LOG_OUT:
            return Object.assign({}, state, {
                loggedIn: false,
                accessToken: null
            })
        case ACTION_TYPE_CHANGE_PASSWORD:
            return Object.assign({}, state, {
                authenticationApiInProgress: true,
                authenticationApiFailureMsg: null,
                authenticationApiCompleted: false
            })
        case ACTION_TYPE_CHANGE_PASSWORD_SUCCESSFUL:
            return Object.assign({}, state, {
                authenticationApiInProgress: false,
                authenticationApiFailureMsg: null,
                authenticationApiCompleted: true
            })
        case ACTION_TYPE_CHANGE_PASSWORD_FAILURE:
            return Object.assign({}, state, {
                authenticationApiInProgress: false,
                authenticationApiFailureMsg: action.response.errorDescription,
                authenticationApiCompleted: true
            })
        case ACTION_TYPE_CLEAR_STATE:
            return Object.assign({}, state, {
                authenticationApiInProgress: false,
                authenticationApiFailureMsg: null,
                authenticationApiCompleted: false,
                accessTokenVerificationInProgress: false
            })
        case ACTION_TYPE_REQUEST_TEMPORARY_AUTH_CODE:
            return Object.assign({}, state, {
                authenticationApiInProgress: true,
                authenticationApiFailureMsg: null,
                authenticationApiCompleted: false
            })
        case ACTION_TYPE_REQUEST_TEMPORARY_AUTH_CODE_SUCCESS:
            return Object.assign({}, state, {
                authenticationApiInProgress: false,
                authenticationApiFailureMsg: null,
                authenticationApiCompleted: true
            })
        case ACTION_TYPE_REQUEST_TEMPORARY_AUTH_CODE_FAILURE:
            return Object.assign({}, state, {
                authenticationApiInProgress: false,
                authenticationApiFailureMsg: action.response.errorDescription,
                authenticationApiCompleted: true
            })
        default:
            return state

    }
}

export const authenticationApiError = state => state.login.authenticationApiFailureMsg
export const authenticationApiInProgress = state => state.login.authenticationApiInProgress
export const authenticationApiCompleted = state => state.login.authenticationApiCompleted
export const accessTokenValidationInProgress = state => state.login.accessTokenVerificationInProgress
export const loggedIn = state => state.login.loggedIn
export const accessToken = state => state.login.accessToken