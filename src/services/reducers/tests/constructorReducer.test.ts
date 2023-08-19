import {constructorReducer, initialConstructorState} from "../constructorReducer";
import {ConstructorE} from "../../actions/constructor";
import {IngredientT, IngredientTypeT} from "../../../utils/types";

describe('constructorReducer', () => {
  test('AddItem', () => {
    expect(constructorReducer(
      initialConstructorState,
      {
        type: ConstructorE.ADD,
        payload: ({_id: "_100_", type: IngredientTypeT.SAUCE} as IngredientT)
      }
    )).toEqual({"items": [{"_id": "_100_", type: IngredientTypeT.SAUCE}], "bun": null})
  })

  test('AddBun', () => {
    expect(constructorReducer(
      initialConstructorState,
      {
        type: ConstructorE.ADD,
        payload: ({_id: "_100_", type: IngredientTypeT.BUN} as IngredientT)
      }
    )).toEqual({"items": [], "bun": {"_id": "_100_", type: IngredientTypeT.BUN}})
  })

  test('DeleteItem', () => {
    expect(constructorReducer(
      {
        items: [
          {_id: "_101_", type: IngredientTypeT.SAUCE} as IngredientT,
          {_id: "_102_", type: IngredientTypeT.MAIN} as IngredientT,
          {_id: "_103_", type: IngredientTypeT.MAIN} as IngredientT,
        ],
        bun: null,
      },
      {
        type: ConstructorE.DELETE,
        payload: 1
      }
    )).toEqual({
      "items": [
        {_id: "_101_", type: IngredientTypeT.SAUCE} as IngredientT,
        {_id: "_103_", type: IngredientTypeT.MAIN} as IngredientT,
      ],
      "bun": null
    })
  })

  test('ShiftItem', () => {
    expect(constructorReducer(
      {
        items: [
          {_id: "_101_", type: IngredientTypeT.SAUCE} as IngredientT,
          {_id: "_102_", type: IngredientTypeT.MAIN} as IngredientT,
          {_id: "_103_", type: IngredientTypeT.MAIN} as IngredientT,
        ],
        bun: null,
      },
      {
        type: ConstructorE.SHIFT,
        payload: {to: 1, from: 2}
      }
    )).toEqual({
      "items": [
        {_id: "_101_", type: IngredientTypeT.SAUCE} as IngredientT,
        {_id: "_103_", type: IngredientTypeT.MAIN} as IngredientT,
        {_id: "_102_", type: IngredientTypeT.MAIN} as IngredientT,
      ],
      "bun": null
    })
  })

  test('ResetItem', () => {
    expect(constructorReducer(
      {
        items: [
          {_id: "_101_", type: IngredientTypeT.SAUCE} as IngredientT,
          {_id: "_102_", type: IngredientTypeT.MAIN} as IngredientT,
          {_id: "_103_", type: IngredientTypeT.MAIN} as IngredientT,
        ],
        bun: null,
      },
      {
        type: ConstructorE.RESET,
      }
    )).toEqual({
      "items": [],
      "bun": null
    })
  })
})
