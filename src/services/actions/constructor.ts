import {IngredientT} from "../../utils/types";

export enum ConstructorE {
    ADD = 'ADD_INGREDIENT',
    DELETE = 'DELETE_INGREDIENT',
    SHIFT = 'SHIFT_INGREDIENT',
    RESET = 'RESET_CONSTRUCTOR',
}

export const addToConstructor = (ingredient: IngredientT) => {
  return {
    type: ConstructorE.ADD,
    payload: {
      ...ingredient,
      id: crypto.randomUUID(),
    }
  };
};

export const sortIngredient = (fromIndex: number | undefined, toIndex: number) => (
  {
    type: ConstructorE.SHIFT,
    payload: {
      from: fromIndex,
      to: toIndex,
    },
  }
)

export const deleteIngredient = (index: number) => (
  {
    type: ConstructorE.DELETE,
    payload: index
  }
)
