import {ConstructorE} from "../actions/constructor";

const initialConstructorState = {
  items: [],
  bun: null,
};

export const constructorReducer = (state = initialConstructorState, action: { type: any; payload: any; }) => {

  switch (action.type) {
    case ConstructorE.ADD: {
      if (action.payload.type === 'bun') {
        return {...state, bun: action.payload}
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case ConstructorE.DELETE: {
      return {
        ...state,
        items: [...state.items].filter((_, index) => index !== action.payload),
      };
    }
    case ConstructorE.SHIFT: {
      const array = [...state.items];
      array.splice(action.payload.to, 0, ...array.splice(action.payload.from, 1))
      return {
        ...state,
        items: [...array],
      }
    }
    case ConstructorE.RESET: {
      return {
        items: [],
        bun: null
      }
    }
    default:
      return state;
  }
}