import {IngredientT} from "../../utils/types";

export enum ModalE {
  OPEN = 'OPEN_MODAL',
  CLOSE = 'CLOSE_MODAL',
}

export interface OpenCurrentIngredientAction {
  readonly type: typeof ModalE.OPEN;
  readonly payload: IngredientT | null;
}

export interface CloseCurrentIngredientAction {
  readonly type: typeof ModalE.CLOSE;
}

export type CurrentIngredientsActions =
  OpenCurrentIngredientAction
  | CloseCurrentIngredientAction
