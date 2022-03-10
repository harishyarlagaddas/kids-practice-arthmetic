import * as actionTypes from '../constants/actionTypes'

export const loginRequestAction = (username, password) => ({
    type: actionTypes.ACTION_TYPE_LOGIN_REQUEST,
    loginDetails: {
        userName: username,
        password: password
    }
})

export const loginResponseAction = response => ({
    type: actionTypes.ACTION_TYPE_LOGIN_RESPONSE,
    response: response
})

export const loginFailureAction = (response) => ({
    type: actionTypes.ACTION_TYPE_LOGIN_FAILURE,
    response: response
})

export const logoutAction = () => {
    return {
        type: actionTypes.ACTION_TYPE_LOG_OUT
    }
}

export const accessTokenValidAction = (response) => ({
    type: actionTypes.ACTION_TYPE_ACCESS_TOKEN_VALID,
    response: response
})

export const accessTokenInvalidAction = () => ({
    type: actionTypes.ACTION_TYPE_ACCESS_TOKEN_INVALID
})

export const validateAccessTokenAction = (token) => ({
    type: actionTypes.ACTION_TYPE_VALIDATE_ACCESS_TOKEN,
    accessToken: token  
})

export const registrationRequestAction = (registrationDetails) => ({
    type: actionTypes.ACTION_TYPE_REGISTRATION_REQUEST,
    registrationDetails: registrationDetails
})

export const registrationSuccessAction = () => ({
    type: actionTypes.ACTION_TYPE_REGISTRATION_SUCCESS
})

export const registrationFailureAction = (response) => ({
    type: actionTypes.ACTION_TYPE_REGISTRATION_FAILURE,
    response: response
})

export const clearStateAction = () => ({
    type: actionTypes.ACTION_TYPE_CLEAR_STATE
})

export const updateAccountInformationAction = (response) => ({
    type: actionTypes.ACTION_TYPE_UPDATE_ACCOUNT_INFORMATION,
    response: response
})

<<<<<<< Updated upstream
=======
export const addNewKidAction = (accessToken, kidsName) => {
    return {
        type: actionTypes.ACTION_TYPE_ADD_NEW_KID,
        kidsName: kidsName,
        accessToken: accessToken
    }
}

export const addNewKidSuccessfulAction = response => {
    return {
        type: actionTypes.ACTION_TYPE_ADD_NEW_KID_SUCCESSFUL,
        response: response
    }
}

export const addNewKidFailureAction = response => {
    return {
        type: actionTypes.ACTION_TYPE_ADD_NEW_KID_FAILURE,
        response: response
    }
}

export const changePasswordAction = (accessToken, currentPassword, newPassword, userName, useCode) => {
    var passwordKey = 'password'
    if (useCode) {
        passwordKey = 'temporaryAuthCode'
    }
    return {
        type: actionTypes.ACTION_TYPE_CHANGE_PASSWORD,
        [passwordKey]: currentPassword,
        newPassword: newPassword,
        accessToken: accessToken,
        userName: userName
    }
}

export const changePasswordSuccessfulAction = response => {
    return {
        type: actionTypes.ACTION_TYPE_CHANGE_PASSWORD_SUCCESSFUL
    }
}

export const changePasswordFailureAction = response => {
    return {
        type: actionTypes.ACTION_TYPE_CHANGE_PASSWORD_FAILURE,
        response: response
    }
}

export const requestTemporaryAuthCodeAction = (userName) => {
    return {
        type: actionTypes.ACTION_TYPE_REQUEST_TEMPORARY_AUTH_CODE,
        userName: userName
    }
}

export const requestTemporaryAuthCodeActionSuccessfulAction = response => {
    return {
        type: actionTypes.ACTION_TYPE_REQUEST_TEMPORARY_AUTH_CODE_SUCCESS
    }
}

export const requestTemporaryAuthCodeActionFailureAction = response => {
    return {
        type: actionTypes.ACTION_TYPE_REQUEST_TEMPORARY_AUTH_CODE_FAILURE,
        response: response
    }
}

>>>>>>> Stashed changes
export const selectKidAction = (kidInfo) => {
    return {
        type: actionTypes.ACTION_TYPE_SELECT_KID,
        kidInfo: kidInfo
    }
}

export const clearAccountInformationAction = () => ({
    type: actionTypes.ACTION_TYPE_CLEAR_ACCOUNT_INFORMATION
})

export const addNewTestAction = (accessToken, testInformation) => ({
    type: actionTypes.ACTION_TYPE_ADD_NEW_TEST,
    accessToken: accessToken,
    testInformation: testInformation
})

export const addNewTestSuccessAction = (testInformation) => ({
    type: actionTypes.ACTION_TYPE_ADD_NEW_TEST_SUCCESSFUL,
    testInformation: testInformation
})

export const addNewTestFailureAction = (response) => ({
    type: actionTypes.ACTION_TYPE_ADD_NEW_TEST_FAILURE,
    response: response
})

export const getAllTestsAction = (accessToken, kidsId) => ({
    type: actionTypes.ACTION_TYPE_GET_ALL_TESTS,
    accessToken: accessToken,
    kidsId: kidsId
})

export const getAllTestsSuccessAction = (response) => ({
    type: actionTypes.ACTION_TYPE_GET_ALL_TESTS_SUCCESS,
    response: response
})

export const getAllTestsFailureAction = (response) => ({
    type: actionTypes.ACTION_TYPE_GET_ALL_TESTS_FAILURE,
    response: response
})

export const clearTestsAction = () => ({
    type: actionTypes.ACTION_TYPE_CLEAR_TESTS
})