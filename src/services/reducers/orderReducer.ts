import {OrderE} from '../actions/order';

const initialOrderState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialOrderState, action: { type: any; order: any; }) => {

  switch (action.type) {
    case OrderE.REQUEST: {
      return {
        ...state,
        orderRequest: true,
      }
    }
    case OrderE.SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        order: action.order,
      }
    }
    case OrderE.FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
      }
    }
    case OrderE.RESET: {
      return {
        ...state,
        order: null,
        orderFailed: true,
        orderRequest: false,
      }
    }
    default:
      return state;
  }
}
