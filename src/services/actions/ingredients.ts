import {BASE_URL} from '../../utils/constants';
import {checkResponse} from "../../utils/api";
import {AppDispatch, IngredientT} from "../../utils/types";

export enum GetIngredients {
  REQUEST = 'GET_INGREDIENTS_REQUEST',
  SUCCESS = 'GET_INGREDIENTS_SUCCESS',
  FAILED = 'GET_INGREDIENTS_FAILED',
}

export interface RequestAction {
  readonly type: typeof GetIngredients.REQUEST;
}

export interface SuccessAction {
  readonly type: typeof GetIngredients.SUCCESS;
  readonly ingredients: IngredientT[];
}

export interface FailedAction {
  readonly type: typeof GetIngredients.FAILED;
}

export type getIngredientsActions =
  RequestAction
  | SuccessAction
  | FailedAction

export function getIngredients() {
  return (dispatch: AppDispatch) => {
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
