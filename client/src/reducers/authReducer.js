 import { TEST_DISPATCH } from '../actions/types'

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case TEST_DISPATCH:
            return {
                // remember that we never change the state as it is immutable, we only make a copy of it
                // then update that new state
                ...state,
                user: action.payload // this is the payload of the action type passed ie TEST_DISPATCH from registeruser
            }
        default:
            return state;
    }
}
