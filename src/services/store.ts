import {createStore, compose, applyMiddleware} from 'redux';
import {rootReducer} from './reducers/rootReducer';
import thunk from 'redux-thunk';
import {socketMiddleware} from "./middlewares/socketMiddleware";
import {wsActions} from "../utils/types";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk,  socketMiddleware(wsActions)));

export const store = createStore(rootReducer, enhancer)
