import { ModalE } from '../actions/currentIngredient';

const initialCurrentIngredientState = {
  currentIngredient: null,
};

export const currentIngredientReducer = (state = initialCurrentIngredientState, action: { type: any; payload: any; }) => {

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
        currentIngredient: ''
      }
    }
    default:
      return state;
  }
}
