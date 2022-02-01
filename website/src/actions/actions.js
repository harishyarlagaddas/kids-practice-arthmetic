import * as actionTypes from '../constants/actionTypes'

export const loginRequestAction = (username, password) => ({
    type: actionTypes.ACTION_TYPE_LOGIN_REQUEST,
    loginDetails: {
        userName: username,
        password: password
    }
})

export const loginResponseAction = payload => ({
    type: actionTypes.ACTION_TYPE_LOGIN_RESPONSE,
    payload: payload
})

export const loginFailureAction = () => ({
    type: actionTypes.ACTION_TYPE_LOGIN_FAILURE
})

export const validateAccessTokenAction = (accessToken) => ({
    type: actionTypes.ACTION_TYPE_VALIDATE_ACCESS_TOKEN,
    accessToken: accessToken
})

export const invalidateAccessTokenAction = () => ({
    type: actionTypes.ACTION_TYPE_INVALIDATE_ACCESS_TOKEN
})

export const setToValidateAccessTokenAction = () => ({
    type: actionTypes.ACTION_TYPE_SET_TO_VALIDATE_ACCESS_TOKEN   
})

export const registrationRequestAction = (username, password) => ({
    type: actionTypes.ACTION_TYPE_REGISTRATION_REQUEST,
    loginDetails: {
        userName: username,
        password: password
    }
})

export const registrationSuccessAction = (accessToken) => ({
    type: actionTypes.ACTION_TYPE_REGISTRATION_SUCCESS,
    accessToken: accessToken
})

export const registrationFailureAction = (errorMsg) => ({
    type: actionTypes.ACTION_TYPE_REGISTRATION_FAILURE,
    errorMsg: errorMsg
})

export const registrationClearStateAction = () => ({
    type: actionTypes.ACTION_TYPE_REGISTRATION_CLEAR_STATE
})