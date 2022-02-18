import { ACTION_TYPE_IN_PROGRESS as ACTION_TYPE_PROCESSING } from "../constants/actionTypes"

const initialState = {
    processing: false
}
export default function appReducer(state=initialState, action) {
    console.log('appReducer action: '+action.type)
    switch(action.type) {
        case ACTION_TYPE_PROCESSING:
            return Object.assign({}, state, {
                processing: action.processing
            })
        default:
            return state
    }
}

export const processing = state => state.app.processing