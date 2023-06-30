import {BASE_URL} from '../../utils/constants';
import {RESET_CONSTRUCTOR} from './constructor';
import {fetchWithRefresh} from '../../utils/api-auth';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const RESET_ORDER = 'RESET_ORDER';

export function postOrder(ingredientData, afterSend) {
  const ingredientsId = ingredientData.map(el => el._id);

  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
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
            type: GET_ORDER_SUCCESS,
            order: res.order.number
          })
          dispatch({
            type: RESET_CONSTRUCTOR
          });

          afterSend()
        } else {
          dispatch({
            type: GET_ORDER_FAILED
          })
        }
      })
      .catch(err => {
        dispatch({
          type: GET_ORDER_FAILED,
          payload: err
        })
      })
  }
}
