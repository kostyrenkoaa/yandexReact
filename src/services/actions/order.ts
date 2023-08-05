import {BASE_URL} from '../../utils/constants';
import {ConstructorE} from './constructor';
import {fetchWithRefresh} from '../../utils/api-auth';
import {AppDispatch, AppThunkT, IngredientT, OrderT} from "../../utils/types";
import {request} from "../../utils/api";

export enum OrderE {
  REQUEST = 'GET_ORDER_REQUEST',
  SUCCESS = 'GET_ORDER_SUCCESS',
  FAILED = 'GET_ORDER_FAILED',
  RESET = 'RESET_ORDER',

  INFO_RESET = 'GET_ORDER_INFO_RESET',
  INFO_REQUEST = 'GET_ORDER_INFO_REQUEST',
  INFO_SUCCESS = 'GET_ORDER_INFO_SUCCESS',
  INFO_ERROR = 'GET_ORDER_INFO_ERROR',
}

export interface RequestAction {
  readonly type: typeof OrderE.REQUEST;
}

export interface SuccessAction {
  readonly type: typeof OrderE.SUCCESS;
  readonly order: number;
}

export interface FailedAction {
  readonly type: typeof OrderE.FAILED;
}

export interface ResetAction {
  readonly type: typeof OrderE.RESET;
}

export interface ResetOrderInfoAction {
  readonly type: typeof OrderE.INFO_RESET;
}

export interface InfoRequestAction {
  readonly type: typeof OrderE.INFO_REQUEST;
}

export interface InfoSuccessAction {
  readonly type: typeof OrderE.INFO_SUCCESS;
  readonly payload: OrderT;
}

export interface InfoErrorAction {
  readonly type: typeof OrderE.INFO_ERROR;
}

export type OrdersActions =
  RequestAction
  | ResetOrderInfoAction
  | SuccessAction
  | FailedAction
  | ResetAction
  | InfoRequestAction
  | InfoSuccessAction
  | InfoErrorAction

export function postOrder(ingredientData: IngredientT[], afterSend: () => void) {
  const ingredientsId = ingredientData.map(el => el._id);

  return function (dispatch: AppDispatch) {
    dispatch({
      type: OrderE.REQUEST
    })

    fetchWithRefresh(`${BASE_URL}/orders`, {
      method: 'POST',
      body: JSON.stringify({
        ingredients: ingredientsId
      })
    })
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: OrderE.SUCCESS,
            order: res.order.number
          })
          dispatch({
            type: ConstructorE.RESET
          });

          afterSend()
        } else {
          dispatch({
            type: OrderE.FAILED
          })
        }
      })
      .catch(err => {
        dispatch({
          type: OrderE.FAILED,
          payload: err
        })
      })
  }
}

export const getOrderInfo = (orderId: string, isAuth: boolean): AppThunkT => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: OrderE.INFO_REQUEST
    });

    const orderUrl = BASE_URL + '/orders/' + orderId;

    const requestHandler = isAuth
      ? fetchWithRefresh(orderUrl, {method: 'GET'})
      : request(orderUrl, {
        method: 'GET',
        headers: {
          "Content-type": 'application/json'
        },
      })

    requestHandler.then(responseData => {
      dispatch({
        type: OrderE.INFO_SUCCESS,
        payload: responseData.orders[0]
      });
    })
      .catch(error => {
        dispatch({
          type: OrderE.INFO_ERROR
        });
        alert('Ошибка при загрузке данных: ' + error);
      });
  };
};
