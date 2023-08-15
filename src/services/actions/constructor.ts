import {IngredientT} from "../../utils/types";

export enum ConstructorE {
  ADD = 'ADD_INGREDIENT',
  DELETE = 'DELETE_INGREDIENT',
  SHIFT = 'SHIFT_INGREDIENT',
  RESET = 'RESET_CONSTRUCTOR',
}

export interface AddIngredientAction {
  readonly type: typeof ConstructorE.ADD;
  readonly payload: IngredientT;
}

export interface DeleteIngredientAction {
  readonly type: typeof ConstructorE.DELETE;
  readonly payload: number;
}

export interface ShiftIngredientAction {
  readonly type: typeof ConstructorE.SHIFT;
  readonly payload: { to: number, from: number };
}

export interface RestIngredientAction {
  readonly type: typeof ConstructorE.RESET;
}

export type ConstructorsActions =
  AddIngredientAction
  | DeleteIngredientAction
  | ShiftIngredientAction
  | RestIngredientAction
