import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from '../reducers';


const middlewares = [ReduxThunk];

let enhancers;

if (__ENVIRONMENT__ === 'PRODUCTION') { // eslint-disable-line 
    enhancers = applyMiddleware(...middlewares);
} else {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line 
    enhancers = composeEnhancers(applyMiddleware(...middlewares));
}

const store = createStore(reducers, enhancers);

export default store;
