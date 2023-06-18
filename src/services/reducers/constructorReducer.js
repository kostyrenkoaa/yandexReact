import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  RESET_CONSTRUCTOR,
  SHIFT_INGREDIENT
} from "../actions/constructor";

const initialConstructorState = {
  items: [],
  bun: null,
};

export const constructorReducer = (state = initialConstructorState, action) => {

  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.payload.type === 'bun') {
        return {...state, bun: action.payload}
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        items: [...state.items].filter((_, index) => index !== action.payload),
      };
    }
    case SHIFT_INGREDIENT: {
      const array = [...state.items];
      array.splice(action.payload.to, 0, ...array.splice(action.payload.from, 1))
      return {
        ...state,
        items: [...array],
      }
    }
    case RESET_CONSTRUCTOR: {
      return {
        items: [],
        bun: null
      }
    }
    default:
      return state;
  }
}