import { GET_ERRORS } from '../actions/types'

const initialState = {}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ERRORS:
            // we return action.payload because the payload is going to include
            // the errors object which comes from our server // check the auth reducer for more
            // in the catch block where dispatch type is GET_ERRORS
            return action.payload;
        default:
            return state;
    }
}
