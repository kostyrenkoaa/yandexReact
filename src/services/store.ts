import {createStore, compose, applyMiddleware} from 'redux';
import {rootReducer} from './reducers/rootReducer';
import thunk from 'redux-thunk';

const composeEnhancers =
    // @ts-ignore
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      // @ts-ignore
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer)
