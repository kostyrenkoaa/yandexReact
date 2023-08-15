import {OrderE, OrdersActions} from '../actions/order';
import {OrderT} from "../../utils/types";

interface InitialOrderStateT {
  order: number | null,
  orderRequest: boolean,
  orderFailed: boolean,
  currentOrder: OrderT | null;
  hasOrderInfo: boolean;
}

const initialOrderState: InitialOrderStateT = {
  order: null,
  currentOrder: null,
  orderRequest: false,
  orderFailed: false,
  hasOrderInfo: false,
};

export const orderReducer = (
  state = initialOrderState,
  action: OrdersActions
): InitialOrderStateT => {

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
    case OrderE.INFO_RESET: {
      return {
        ...state,
        hasOrderInfo: false
      }
    }

    case OrderE.INFO_REQUEST: {
      return {
        ...state
      };
    }

    case OrderE.INFO_SUCCESS: {
      return {
        ...state,
        currentOrder: action.payload,
        hasOrderInfo: true
      };
    }

    case OrderE.INFO_ERROR: {
      return {
        ...state
      };
    }

    default:
      return state;
  }
}
