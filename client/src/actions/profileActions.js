import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE } from './types';

// Get current profile 
// it takes in no argument
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(error => dispatch({
            type: GET_PROFILE, //GET_ERRORS,  the reason why we aren't using get errors is because a profile can be null
                                // ie empy, so if a profile is empty, we just have to show a small button to tell 
                                // the user to create a new profile
            payload: {} // so if there isn't any profile, we just have to return an empty object as the profile, because the
                        // user hasn't created one
                        // The reason is because you can register and not have a profile
        }))
}

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
        // note that we this type PROFILE_LOADING we don't need to send the reducer any payload
        // as it's just going to see / know  that the profile is loading
    }
}

// Clear current profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}


// Create Profile
// We use history here because if we want to re-direct we use withRouter in our component
// and then pass in this.props.history
// so that we can re-direct, because once we create the profile we simply want to redirect
export const createProfile = (profileData, history) => dispatch => {
    axios
        .post('/api/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }
        ))
}
