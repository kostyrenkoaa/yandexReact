import {ConstructorE, ConstructorsActions} from "../actions/constructor";
import {IngredientT, IngredientTypeT} from "../../utils/types";

type InitialConstructorStateT = {
  items: IngredientT[];
  bun: IngredientT | null;
}

const initialConstructorState: InitialConstructorStateT = {
  items: [],
  bun: null,
};

export const constructorReducer = (
  state = initialConstructorState,
  action: ConstructorsActions
): InitialConstructorStateT => {

  switch (action.type) {
    case ConstructorE.ADD: {
      if (action.payload.type === IngredientTypeT.BUN) {
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
