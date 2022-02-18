import {
    ACTION_TYPE_REGISTRATION_REQUEST,
    ACTION_TYPE_REGISTRATION_SUCCESS,
    ACTION_TYPE_REGISTRATION_FAILURE,
    ACTION_TYPE_CLEAR_STATE
} from '../constants/actionTypes'

const initialState = {
    registrationInProgress: false,
    registrationSucessful: false,
    registrationErrorMessage: null
}

export default function registrationReducer(state=initialState, action) {
    console.log('registrationReducer. action type: '+action.type)
    switch(action.type) {
        case ACTION_TYPE_REGISTRATION_REQUEST:
            return Object.assign({}, state, {
                registrationInProgress: true,
                registrationSucessful: false,
                registrationErrorMessage: null
            })
        case ACTION_TYPE_REGISTRATION_SUCCESS:
            return Object.assign({}, state, {
                registrationInProgress: false,
                registrationSucessful: true,
                registrationErrorMessage: null
            })
        case ACTION_TYPE_REGISTRATION_FAILURE:
            console.log(action)
            return Object.assign({}, state, {
                registrationInProgress: false,
                registrationSucessful: false,
                registrationErrorMessage: action.response.errorDescription
            })
        case ACTION_TYPE_CLEAR_STATE:
            return Object.assign({}, state, {
                registrationInProgress: false,
                registrationSucessful: false,
                registrationErrorMessage: null
            })
        default:
            return state

    }
}

export const registrationInProgress = state => state.registration.registrationInProgress
export const registrationSuccess = state => state.registration.registrationSucessful
export const registrationError = state => state.registration.registrationErrorMessage