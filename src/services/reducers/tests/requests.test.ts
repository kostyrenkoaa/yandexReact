import {UserT} from "../../../utils/types";
import {requestReducer, initialState} from "../requests";
import {UserRequest} from "../../actions/requests";

describe('requestReducer', () => {

  test('Login', () => {
    expect(requestReducer(
      initialState,
      {
        type: UserRequest.LOGIN,
      }
    )).toEqual({
      ...initialState,
      loginRequest: true,
    })
  })

  test('loginSuccess', () => {
    expect(requestReducer(
      initialState,
      {
        type: UserRequest.LOGIN_SUCCESS,
        payload: {
          user: {name: 'test'} as UserT
        }
      }
    )).toEqual({
      ...initialState,
      loginRequest: true,
      isAuthChecked: true,
      userInfo: {name: 'test'},
    })
  })

  test('loginFailed', () => {
    expect(requestReducer(
      initialState,
      {
        type: UserRequest.LOGIN_FAILED,
      }
    )).toEqual({
      ...initialState,
      loginRequestFailed: true,
    })
  })

  test('Logout', () => {
    expect(requestReducer(
      initialState,
      {
        type: UserRequest.LOGOUT,
      }
    )).toEqual({
      ...initialState,
      logoutRequest: true
    })
  })

  test('logoutSuccess', () => {
    expect(requestReducer(
      {
        ...initialState,
        userInfo: {name: 'test'} as UserT
      },
      {
        type: UserRequest.LOGOUT_SUCCESS,
      }
    )).toEqual({
      ...initialState,
      logoutRequest: true,
      userInfo: null,
      isAuthChecked: false,
    })
  })

  test('logoutFailed', () => {
    expect(requestReducer(
      initialState,
      {
        type: UserRequest.LOGOUT_FAILED,
      }
    )).toEqual({
      ...initialState,
      logoutRequest: false,
      logoutRequestFailed: true,
      isAuthChecked: false,
    })
  })

  test('updateUserData', () => {
    expect(requestReducer(
      initialState,
      {
        type: UserRequest.UPDATE_USER_DATA,
      }
    )).toEqual({
      ...initialState,
      updateUserRequest: true,
      updateUserRequestFailed: false,
    })
  })

  test('updateUserDataSuccess', () => {
    expect(requestReducer(
      initialState,
      {
        type: UserRequest.UPDATE_USER_DATA_SUCCESS,
        payload: {name: 'test'} as UserT,
      }
    )).toEqual({
      ...initialState,
      userInfo: {name: 'test'},
      updateUserRequest: false,
    })
  })

  test('updateUserDataFailed', () => {
    expect(requestReducer(
      initialState,
      {
        type: UserRequest.UPDATE_USER_DATA_FAILED,
      }
    )).toEqual({
      ...initialState,
      updateUserRequest: false,
      updateUserRequestFailed: true,
    })
  })

  test('Registration', () => {
    expect(requestReducer(
      initialState,
      {
        type: UserRequest.REGISTRATION,
      }
    )).toEqual({
      ...initialState,
      registrationRequest: true,
      registrationRequestFailed: false,
      isAuthChecked: false,
    })
  })

  test('registrationSuccess', () => {
    expect(requestReducer(
      initialState,
      {
        type: UserRequest.REGISTRATION_SUCCESS,
        payload: {user: {name: 'test'} as UserT},
      }
    )).toEqual({
      ...initialState,
      registrationRequest: true,
      userInfo: {name: 'test'},
      isAuthChecked: true,
    })
  })

  test('registrationFailed', () => {
    expect(requestReducer(
      initialState,
      {
        type: UserRequest.REGISTRATION_FAILED,
      }
    )).toEqual({
      ...initialState,
      registrationRequest: false,
      registrationRequestFailed: true,
      isAuthChecked: false,
    })
  })

  test('resetPassword', () => {
    expect(requestReducer(
      initialState,
      {
        type: UserRequest.RESET_PASSWORD,
      }
    )).toEqual({
      ...initialState,
      resetPasswordRequest: true,
      resetPasswordRequestFailed: false,
    })
  })

  test('resetPasswordSuccess', () => {
    expect(requestReducer(
      initialState,
      {
        type: UserRequest.RESET_PASSWORD_SUCCESS,
      }
    )).toEqual({
      ...initialState,
      resetPasswordRequest: false,
    })
  })

  test('resetPasswordFailed', () => {
    expect(requestReducer(
      initialState,
      {
        type: UserRequest.RESET_PASSWORD_FAILED,
      }
    )).toEqual({
      ...initialState,
      resetPasswordRequest: false,
      resetPasswordRequestFailed: true,
    })
  })

  test('forgotPassword', () => {
    expect(requestReducer(
      initialState,
      {
        type: UserRequest.FORGOT_PASSWORD,
      }
    )).toEqual({
      ...initialState,
      forgotPasswordRequest: true,
      forgotPasswordRequestFailed: false,
    })
  })

  test('forgotPasswordSuccess', () => {
    expect(requestReducer(
      initialState,
      {
        type: UserRequest.FORGOT_PASSWORD_SUCCESS,
        payload: 'testEmail',
      }
    )).toEqual({
      ...initialState,
      forgotPasswordRequest: false,
      email: 'testEmail',
    })
  })

  test('forgotPasswordFailed', () => {
    expect(requestReducer(
      initialState,
      {
        type: UserRequest.FORGOT_PASSWORD_FAILED,
      }
    )).toEqual({
      ...initialState,
      forgotPasswordRequest: false,
      forgotPasswordRequestFailed: true,
    })
  })

  test('getUser', () => {
    expect(requestReducer(
      initialState,
      {
        type: UserRequest.GET_USER,
      }
    )).toEqual({
      ...initialState,
      getUserRequest: true,
      getUserRequestFailed: false,
    })
  })

  test('getUserSuccess', () => {
    expect(requestReducer(
      initialState,
      {
        type: UserRequest.GET_USER_SUCCESS,
        payload: {name: 'test'} as UserT,
      }
    )).toEqual({
      ...initialState,
      getUserRequest: false,
      userInfo: {name: 'test'},
    })
  })

  test('getUserFailed', () => {
    expect(requestReducer(
      initialState,
      {
        type: UserRequest.GET_USER_FAILED,
      }
    )).toEqual({
      ...initialState,
      getUserRequest: false,
      getUserRequestFailed: true,
    })
  })

  test('authChecked', () => {
    expect(requestReducer(
      initialState,
      {
        type: UserRequest.AUTH_CHECKED,
      }
    )).toEqual({
      ...initialState,
      isAuthChecked: true,
    })
  })
})
