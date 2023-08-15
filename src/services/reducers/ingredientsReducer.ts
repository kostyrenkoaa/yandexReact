import {GetIngredients, getIngredientsActions} from '../actions/ingredients';
import {IngredientT} from "../../utils/types";

type InitialIngredientsStateT = {
  ingredients: IngredientT[],
  ingredientsRequest: boolean,
  ingredientsFailed: boolean,
};

export const initialIngredientsState: InitialIngredientsStateT = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (
  state = initialIngredientsState,
  action: getIngredientsActions
): InitialIngredientsStateT => {
  switch (action.type) {
    case GetIngredients.REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      }
    }
    case GetIngredients.SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredients: action.ingredients,
      }
    }
    case GetIngredients.FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
      }
    }
    default:
      return state;
  }
}
