import {GetIngredients} from '../actions/ingredients';

const initialIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (state = initialIngredientsState, action: { type: any; ingredients: any; }) => {
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
