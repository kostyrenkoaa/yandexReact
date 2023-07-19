import {BASE_URL} from '../../utils/constants';
import {checkResponse} from "../../utils/api";
import {IngredientT} from "../../utils/types";

export enum GetIngredients {
    REQUEST = 'GET_INGREDIENTS_REQUEST',
    SUCCESS = 'GET_INGREDIENTS_SUCCESS',
    FAILED = 'GET_INGREDIENTS_FAILED',
}

export function getIngredients() {
  return function (dispatch: (arg0: { type: GetIngredients; ingredients?: IngredientT[] }) => void) {
    dispatch({
      type: GetIngredients.REQUEST
    })
    fetch(`${BASE_URL}/ingredients`)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GetIngredients.SUCCESS,
            ingredients: res.data
          })
        } else {
          dispatch({
            type: GetIngredients.FAILED
          })
        }
      })
      .catch(err => {
        dispatch({
          type: GetIngredients.FAILED
        })
      })
  }
}
