import axios from "axios"
import {
    registrationSuccessAction,
    registrationFailureAction,
    accessTokenValidAction,
    updateAccountInformationAction
} from '../actions/actions'

import {
    ACTION_TYPE_REGISTRATION_REQUEST
} from '../constants/actionTypes'

import {
    REGISTRATION_URL
} from '../constants/serverConsts'

export const registrationMiddleware = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === ACTION_TYPE_REGISTRATION_REQUEST) {
        console.log(action)
        console.log('registrationMiddleware action: %s', JSON.stringify(action))

        const postBody = {
            userName: action.registrationDetails.userName,
            password: action.registrationDetails.password,
            kidsNames: action.registrationDetails.kidsNames
        }

        const axiosInstance = axios.create({
        })
        
        axiosInstance.post(REGISTRATION_URL, postBody)
            .then(response => {
                console.log('registration request successful. response: %s', JSON.stringify(response.data))
                dispatch(registrationSuccessAction())
                dispatch(accessTokenValidAction(response.data))
                dispatch(updateAccountInformationAction(response.data))
            })
            .catch(error => {
                console.log('registration error. error: %s', error)
                if (error.response) {
                    dispatch(registrationFailureAction(error.response.data))
                } else {
                    dispatch(registrationFailureAction({
                        errorDescription: 'Network Error. Please try again..'
                    }))
                }
            })
        
        console.log('registrationMiddleware registrationRequest Out')
    }
}