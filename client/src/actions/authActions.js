// ACTION CREATOR // Dispatching to the reducer the data that is passing
import { TEST_DISPATCH } from '../actions/types'
// Register User Action
export const registeruser = (userData) => {
// Regardless the action much also include a type:
// to be returned
    return {
        // note that you can just return the types only if need be
        // But alot of times you will also have data (payload) as well
        type: TEST_DISPATCH,
        payload: userData 
    }
}
