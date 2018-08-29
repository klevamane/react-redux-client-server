import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import RootReducer from './reducers'; // we can do this because we have index.js as our root reducer

//check what this does
const middleware = [thunk];
const initialState = {};
// check what this does


// Because we want to configure redux extension for the browser and it has to be in the 3rd parameter
// notice that we already have applyMiddleware there, therefore we use compose from redux to compose them together
const store = createStore(RootReducer, initialState,
   compose(
       applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // redux chrome extension configuration
    ));

export default store;
