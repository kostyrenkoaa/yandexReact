import {WSE} from '../actions/ws';

import type {WSActionsT} from '../actions/ws';

type WSStateT = {
  wsConnected: boolean;
  orders: [];
  userOrders: [];
  totalOrders: number | null;
  totalOrdersToday: number | null;
  error?: Event;
  hasMsg: boolean;
};

export const initialState: WSStateT = {
  wsConnected: false,
  orders: [],
  userOrders: [],
  totalOrders: null,
  totalOrdersToday: null,
  hasMsg: false,
};

export const wsReducer = (
  state = initialState,
  action: WSActionsT
): WSStateT => {
  switch (action.type) {
    case WSE.SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };

    case WSE.ERROR:
      return {
        ...state,
        hasMsg: false,
        error: action.payload,
        wsConnected: false
      };

    case WSE.CLOSED:
      return {
        ...state,
        hasMsg: false,
        error: undefined,
        wsConnected: false
      };

    case WSE.GET_MESSAGE:
      return {
        ...state,
        hasMsg: true,
        error: undefined,
        orders: JSON.parse(action.payload).orders,
        totalOrders: JSON.parse(action.payload).total,
        totalOrdersToday: JSON.parse(action.payload).totalToday
      };

    default:
      return state;
  }
};
