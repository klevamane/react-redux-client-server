import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        // Apply to every request. ie set the header Authorization with this token if it exists
        axios.defaults.headers.common['Authorization'] = token;
    }
    else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;
