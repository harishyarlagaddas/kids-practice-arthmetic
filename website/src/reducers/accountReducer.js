import { 
    ACTION_TYPE_ADD_NEW_KID, 
    ACTION_TYPE_ADD_NEW_KID_FAILURE, 
    ACTION_TYPE_ADD_NEW_KID_SUCCESSFUL, 
    ACTION_TYPE_ADD_NEW_TEST, 
    ACTION_TYPE_ADD_NEW_TEST_FAILURE, 
    ACTION_TYPE_ADD_NEW_TEST_SUCCESSFUL,
    ACTION_TYPE_CLEAR_ACCOUNT_INFORMATION, 
    ACTION_TYPE_CLEAR_STATE, 
    ACTION_TYPE_CLEAR_TESTS, 
    ACTION_TYPE_GET_ALL_TESTS, 
    ACTION_TYPE_GET_ALL_TESTS_FAILURE, 
    ACTION_TYPE_GET_ALL_TESTS_SUCCESS, 
    ACTION_TYPE_SELECT_KID, 
    ACTION_TYPE_UPDATE_ACCOUNT_INFORMATION 
} from "../constants/actionTypes"
import { OPERATION_TYPE_ADDITION, OPERATION_TYPE_DIVISION, OPERATION_TYPE_MULTIPLICATION, OPERATION_TYPE_SUBTRACTION } from "../constants/consts"
import { JSON_KEY_TEST_TIME } from "../constants/jsonKeys"

const initialState = {
    userName: '',
    kidsInformation: [
        {
            kidsName: 'Test Kid',
            kidsId: ''
        }
    ],
    selectedKid: {
        kidsName: 'Test Kid',
        kidsId: ''
    },
    apiCallInProgress: false,
    apiCallFailureMessage: null,
    apiCallComplete: false,
    tests: [],
    lastTimeTestsRetrieved: null
}

export default function accountReducer(state=initialState, action) {
    console.log('accountReducer action: '+action.type)
    switch(action.type) {
        case ACTION_TYPE_UPDATE_ACCOUNT_INFORMATION:
            console.log(action.response)
            return Object.assign({}, state, {
                userName: action.response.userName,
                kidsInformation: action.response.kidsInfo
            })
        case ACTION_TYPE_SELECT_KID:
            console.log(action.kidInfo)
            return Object.assign({}, state, {
                selectedKid: action.kidInfo
            })
        case ACTION_TYPE_ADD_NEW_KID:
            console.log(action.kidsName)
            return Object.assign({}, state, {
                apiCallInProgress: true,
                apiCallComplete: false,
                apiCallFailureMessage: null
            })
        case ACTION_TYPE_ADD_NEW_KID_SUCCESSFUL:
            console.log(action.response)
            return Object.assign({}, state, {
                apiCallInProgress: false,
                apiCallComplete: true,
                apiCallFailureMessage: null,
                kidsInformation: [...(state.kidsInformation || []), action.response]
            })
        case ACTION_TYPE_ADD_NEW_KID_FAILURE:
            console.log('action: '+JSON.stringify(action))
            return Object.assign({}, state, {
                apiCallInProgress: false,
                apiCallComplete: true,
                apiCallFailureMessage: action.response.errorDescription
            })
        case ACTION_TYPE_CLEAR_ACCOUNT_INFORMATION:
            return Object.assign({}, state, {
                userName: '',
                kidsInformation: null,
                selectedKid: null,
                tests: [],
                lastTimeTestsRetrieved: null
            })
        case ACTION_TYPE_CLEAR_STATE:
            return Object.assign({}, state, {
                apiCallInProgress: false,
                apiCallComplete: false,
                apiCallFailureMessage: null
            })
        case ACTION_TYPE_ADD_NEW_TEST :
            return Object.assign({}, state, {
                apiCallInProgress: true,
                apiCallComplete: false
            })
        case ACTION_TYPE_ADD_NEW_TEST_SUCCESSFUL:
            return Object.assign({}, state, {
                apiCallInProgress: false,
                apiCallComplete: true,
                tests: [...(state.tests || []), action.testInformation]
            })
        case ACTION_TYPE_ADD_NEW_TEST_FAILURE:
            return Object.assign({}, state, {
                apiCallInProgress: false,
                apiCallComplete: true,
                apiCallFailureMessage: action.response.errorDescription
            })
        case ACTION_TYPE_GET_ALL_TESTS:
            return Object.assign({}, state, {
                apiCallInProgress: true,
                apiCallComplete: false
            })
        case ACTION_TYPE_GET_ALL_TESTS_SUCCESS:
            return Object.assign({}, state, {
                apiCallInProgress: false,
                apiCallComplete: true,
                tests: action.response.tests,
                lastTimeTestsRetrieved: Date.now()
            })
        case ACTION_TYPE_GET_ALL_TESTS_FAILURE:
            return Object.assign({}, state, {
                apiCallInProgress: false,
                apiCallComplete: true,
                apiCallFailureMessage: action.response.errorDescription,
                lastTimeTestsRetrieved: null
            })
        case ACTION_TYPE_CLEAR_TESTS:
            return Object.assign({}, state, {
                tests: [],
                lastTimeTestsRetrieved: null
            })

        default:
            return state
    }
}

export const kidsNames = state => {
    if (null == state.account.kidsInformation) {
        return []
    } else {
        return state.account.kidsInformation.map(info => info.kidsName)
    }   
}

export const numOfKids = state => {
    if (null == state.account.kidsInformation) {
        return 0
    } else {
       return state.account.kidsInformation.length
    }
}

export const userName = state => state.account.userName
export const selectedKidInfo = state => state.account.selectedKid
export const kidsInfo = state => state.account.kidsInformation
export const apiCallInProgress = state => state.account.apiCallInProgress
export const apiCallComplete = state => state.account.apiCallComplete
export const apiCallFailureMsg = state => state.account.apiCallFailureMessage
export const lastTimeTestsRetrieved = state => state.account.lastTimeTestsRetrieved
export const additionTests = state => {
    const addTests = state.account.tests.filter((test) => {return test.operation === OPERATION_TYPE_ADDITION})
    addTests.sort((a, b) => b[JSON_KEY_TEST_TIME] - a[JSON_KEY_TEST_TIME])
    return addTests.slice(0, 5);
}
export const subtractionTests = state => {
    const subTests = state.account.tests.filter((test) => {return test.operation === OPERATION_TYPE_SUBTRACTION})
    subTests.sort((a, b) => b[JSON_KEY_TEST_TIME] - a[JSON_KEY_TEST_TIME])
    return subTests.slice(0, 5)
}
export const multiplicationTests = state => {
    const mulTests = state.account.tests.filter((test) => {return test.operation === OPERATION_TYPE_MULTIPLICATION})
    mulTests.sort((a,b) => b[JSON_KEY_TEST_TIME] - a[JSON_KEY_TEST_TIME])
    return mulTests.slice(0, 5)
}
export const divisionTests = state => {
    const divTests = state.account.tests.filter((test) => {return test.operation === OPERATION_TYPE_DIVISION})
    divTests.sort((a,b) => b[JSON_KEY_TEST_TIME] - a[JSON_KEY_TEST_TIME])
    return divTests.slice(0, 5)
}