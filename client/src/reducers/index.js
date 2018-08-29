import { combineReducers } from 'redux';
import authReducer from './authReducer';



export default combineReducers({
    // When used in any component anything from auth reducer will
    // be used as this.props.auth as opposed to this.props.authReducer
    auth: authReducer // implemented in auth/register component
});
