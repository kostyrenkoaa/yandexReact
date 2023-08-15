import {CurrentIngredientsActions, ModalE} from '../actions/currentIngredient';
import {IngredientT} from "../../utils/types";

type InitialCurrentIngredientStateT = {
  currentIngredient: IngredientT | null;
}

const initialCurrentIngredientState: InitialCurrentIngredientStateT = {
  currentIngredient: null,
};

export const currentIngredientReducer = (
  state = initialCurrentIngredientState,
  action: CurrentIngredientsActions
): InitialCurrentIngredientStateT => {

  switch (action.type) {
    case ModalE.OPEN: {
      return {
        ...state,
        currentIngredient: action.payload
      }
    }
    case ModalE.CLOSE: {
      return {
        ...state,
        currentIngredient: null
      }
    }
    default:
      return state;
  }
}
