import axios from "axios"
import {
    registrationSuccessAction,
    registrationFailureAction
} from '../actions/actions'

import {
    ACTION_TYPE_REGISTRATION_REQUEST
} from '../constants/actionTypes'

import {
    REGISTRATION_URL
} from '../constants/urls'

export const registrationMiddleware = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === ACTION_TYPE_REGISTRATION_REQUEST) {
        console.log(action)
        const { userName, password } = action.loginDetails
        console.log('registrationMiddleware userName: %s', userName)
        
        const postBody = {
            userName: userName,
            password: password
        }

        const axiosInstance = axios.create({
        })
        
        // axiosInstance.post(REGISTRATION_URL, postBody)
        //     .then(data => {
        //         console.log('registration request successful. response: %s', data)
        //         dispatch(registrationSuccessAction({
        //             response: data.accessToken
        //         }))
        //     })
        //     .catch(error => {
        //         console.log('registration error. error: %s', error)
        //         dispatch(registrationFailureAction(('errorDescription' in error) ? error['errorDescription'] : 'server error'))
        //     })
        setTimeout(() => {
            dispatch(registrationSuccessAction('server error'))
            dispatch()
        }, 5000)
        console.log('registrationMiddleware registrationRequest Out')
    }
}