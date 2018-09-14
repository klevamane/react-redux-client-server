// ACTION CREATOR // Dispatching to the reducer the data that is passing
import { GET_ERRORS, SET_CURRENT_USER } from "../actions/types";
import axios from "axios";
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// Register User Action
export const registeruser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData) // remember that we have a proxyscript implicitly adding the httplocalhos:3000
    .then(res => history.push('/login')) // using history here because we have already implemented it in the register component

    // set the errors object to recieve errors
      // redux thunk enables use to dispatch the error to the reducer ie the errors reducer we created or will create
      // redux thunk was initialized in the store with the applyMiddleware

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data // puting it into our redux state
      })
    );
  // Regardless the action much also include a type:
  // to be returned
};


export const loginUser = (userData, history) => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            // save to local storage // Disclaimer its better to use session storage to store these data but we'll use localStorage here
            // from our api when we login successfully we get a token passed
            const {token} = res.data;
            // Note localStorage only stores string
            localStorage.setItem('jwtToken', token);
            // set token to the Authentication Header
            setAuthToken(token);
            // Decode token to get the user
            const decoded = jwt_decode(token);
            // set current user
           dispatch(setCurrentUser(decoded));
           return history.push('/dashboard');
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = () => dispatch => {
  // Remove token from localstorage
  localStorage.removeItem('jwtToken');
  // Remove Authentication Header for future requests by setting the setAuthToken to false
  setAuthToken(false);
  // Set the current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
}
