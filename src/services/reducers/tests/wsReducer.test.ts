import {wsReducer, initialState} from "../wsReducer";
import {WSE} from '../../actions/ws';

describe('wsReducer', () => {
  test('success', () => {
    expect(wsReducer(
      initialState,
      {
        type: WSE.SUCCESS,
        payload: {} as Event
      }
    )).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: true
    })
  })

  test('error', () => {
    expect(wsReducer(
      initialState,
      {
        type: WSE.ERROR,
        payload: {} as Event
      }
    )).toEqual({
      ...initialState,
      hasMsg: false,
      error: {},
      wsConnected: false
    })
  })

  test('closed', () => {
    expect(wsReducer(
      initialState,
      {
        type: WSE.CLOSED,
      }
    )).toEqual({
      ...initialState,
      hasMsg: false,
      error: undefined,
      wsConnected: false
    })
  })

  test('getMessage', () => {
    expect(wsReducer(
      initialState,
      {
        type: WSE.GET_MESSAGE,
        payload: '{"orders":[12,13,14], "total": 12, "totalToday": 13}',
      }
    )).toEqual({
      ...initialState,
      hasMsg: true,
      error: undefined,
      orders: [12,13,14],
      totalOrders: 12,
      totalOrdersToday: 13
    })
  })
})
