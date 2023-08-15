import {ConstructorsActions} from "../services/actions/constructor";
import {CurrentIngredientsActions} from "../services/actions/currentIngredient";
import {getIngredientsActions} from "../services/actions/ingredients";
import {OrdersActions} from "../services/actions/order";
import {RequestsActions} from "../services/actions/requests";
import {WSActionsT, WSE} from "../services/actions/ws";
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {store} from "../services/store";

export enum IngredientTypeT {
  BUN = 'bun',
  MAIN = 'main',
  SAUCE = 'sauce'
}

export type IngredientT = {
  id?: string;
  _id: string;
  name: string;
  type: IngredientTypeT;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  index?: number;
};

export type OrderT = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type UserT = {
  name: string;
  email: string;
};

export type ActionsT =
  ConstructorsActions |
  CurrentIngredientsActions |
  getIngredientsActions |
  OrdersActions |
  RequestsActions |
  WSActionsT;

export type WST = {
  wsInit: typeof WSE.START;
  onOpen: typeof WSE.SUCCESS;
  onClose: typeof WSE.CLOSED;
  onError: typeof WSE.ERROR;
  onMessage: typeof WSE.GET_MESSAGE;
};

export const wsActions: WST = {
  wsInit: WSE.START,
  onOpen: WSE.SUCCESS,
  onClose: WSE.CLOSED,
  onError: WSE.ERROR,
  onMessage: WSE.GET_MESSAGE,
};


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, never, ActionsT>;

type DispatchFunc = () => AppDispatch;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunkT<TReturn = void> = ThunkAction<TReturn, RootState, never, ActionsT>;


export type OrderIngredientT = IngredientT & {
  quantityInOrder: number;
};

export type TParams = {
  number?: string;
  id?: string;
};
