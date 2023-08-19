import type {Middleware, MiddlewareAPI} from 'redux';
import type {AppDispatch, RootState, WST} from '../../utils/types';
import {WSActionsT} from '../actions/ws';

export const socketMiddleware = (wsActions: WST): Middleware => {

  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    return next => (action: WSActionsT) => {
      const {dispatch} = store;
      const {type} = action;
      const {wsInit, onOpen, onClose, onError, onMessage} = wsActions;

      if (type === wsInit) {
        if (!window.socket || (window.socket && window.socket?.url !== action.payload)) {
          window.socket = new WebSocket(action.payload);
        }
      }

      if (window.socket) {
        window.socket.onopen = (event) => {
          dispatch({type: onOpen, payload: event});
        }

        window.socket.onerror = (event) => {
          dispatch({type: onError, payload: event});
        }

        window.socket.onmessage = (event) => {
          const {data} = event;
          dispatch({type: onMessage, payload: data});
        }

        window.socket.onclose = (event) => {
          dispatch({type: onClose, payload: event});
        }
      }

      if (type === onClose && window.socket?.readyState === 1) {
        window.socket.close();
        window.socket = null;
      }

      next(action);
    };

  }) as Middleware;
}
