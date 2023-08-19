import {IngredientT, IngredientTypeT} from "../../../utils/types";
import {currentIngredientReducer, initialCurrentIngredientState} from "../currentIngredientReducer";
import {ModalE} from "../../actions/currentIngredient";

describe('currentIngredientReducer', () => {
  test('Open', () => {
    expect(currentIngredientReducer(
      initialCurrentIngredientState,
      {
        type: ModalE.OPEN,
        payload: ({_id: "_100_", type: IngredientTypeT.SAUCE} as IngredientT)
      }
    )).toEqual({currentIngredient: {_id: "_100_", type: IngredientTypeT.SAUCE}})
  })

  test('Open', () => {
    expect(currentIngredientReducer(
      initialCurrentIngredientState,
      {
        type: ModalE.CLOSE,
      }
    )).toEqual({currentIngredient: null})
  })
})
