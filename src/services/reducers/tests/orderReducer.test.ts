import {OrderT} from "../../../utils/types";
import {initialOrderState, orderReducer} from "../orderReducer";
import {OrderE} from "../../actions/order";

describe('orderReducer', () => {
  test('Request', () => {
    expect(orderReducer(
      initialOrderState,
      {
        type: OrderE.REQUEST,
      }
    )).toEqual({
      ...initialOrderState,
      orderRequest: true,
    })
  })

  test('Success', () => {
    expect(orderReducer(
      initialOrderState,
      {
        type: OrderE.SUCCESS,
        order: 123,
      }
    )).toEqual({
      ...initialOrderState,
      orderRequest: false,
      orderFailed: false,
      order: 123,
    })
  })

  test('Failed', () => {
    expect(orderReducer(
      initialOrderState,
      {
        type: OrderE.FAILED,
      }
    )).toEqual({
      ...initialOrderState,
      orderFailed: true,
      orderRequest: false,
    })
  })

  test('InfoReset', () => {
    expect(orderReducer(
      initialOrderState,
      {
        type: OrderE.INFO_RESET,
      }
    )).toEqual({
      ...initialOrderState,
      hasOrderInfo: false
    })
  })

  test('InfoRequest', () => {
    expect(orderReducer(
      initialOrderState,
      {
        type: OrderE.INFO_REQUEST,
      }
    )).toEqual({
      ...initialOrderState,
    })
  })

  test('InfoSuccess', () => {
    expect(orderReducer(
      initialOrderState,
      {
        type: OrderE.INFO_SUCCESS,
        payload: {_id: '_001'} as OrderT,
      }
    )).toEqual({
      ...initialOrderState,
      currentOrder: {_id: '_001'} as OrderT,
      hasOrderInfo: true,
    })
  })

  test('InfoError', () => {
    expect(orderReducer(
      initialOrderState,
      {
        type: OrderE.INFO_ERROR,
      }
    )).toEqual({
      ...initialOrderState,
    })
  })
})
