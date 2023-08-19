import {ingredientsReducer, initialIngredientsState} from "../ingredientsReducer";
import {GetIngredients} from "../../actions/ingredients";
import {IngredientT, IngredientTypeT} from "../../../utils/types";

describe('ingredientsReducer', () => {
  test('Request', () => {
    expect(ingredientsReducer(
      initialIngredientsState,
      {
        type: GetIngredients.REQUEST,
      }
    )).toEqual({
      ingredients: [],
      ingredientsRequest: true,
      ingredientsFailed: false,
    })
  })

  test('Success', () => {
    expect(ingredientsReducer(
      initialIngredientsState,
      {
        type: GetIngredients.SUCCESS,
        ingredients: [
          {_id: "_101_", type: IngredientTypeT.SAUCE} as IngredientT,
          {_id: "_102_", type: IngredientTypeT.MAIN} as IngredientT,
          {_id: "_103_", type: IngredientTypeT.MAIN} as IngredientT,
        ],
      }
    )).toEqual({
      ingredients: [
        {_id: "_101_", type: IngredientTypeT.SAUCE} as IngredientT,
        {_id: "_102_", type: IngredientTypeT.MAIN} as IngredientT,
        {_id: "_103_", type: IngredientTypeT.MAIN} as IngredientT,
      ],
      ingredientsRequest: false,
      ingredientsFailed: false,
    })
  })

  test('Failed', () => {
    expect(ingredientsReducer(
      initialIngredientsState,
      {
        type: GetIngredients.FAILED,
      }
    )).toEqual({
      ...initialIngredientsState,
      ingredientsRequest: false,
      ingredientsFailed: true,
    })
  })
})
