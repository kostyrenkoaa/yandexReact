import {RequestsActions, UserRequest} from '../actions/requests'
import {UserT} from "../../utils/types";

interface InitialStateT {
  isAuthChecked: boolean,
  userInfo: UserT | null,

  registrationRequest: boolean,
  registrationRequestFailed: boolean,

  loginRequest: boolean,
  loginRequestFailed: boolean,

  getUserRequest: boolean,
  getUserRequestFailed: boolean,

  updateUserRequest: boolean,
  updateUserRequestFailed: boolean,

  logoutRequest: boolean,
  logoutRequestFailed: boolean,

  forgotPasswordRequest: boolean,
  forgotPasswordRequestFailed: boolean,
  email: string,

  resetPasswordRequest: boolean,
  resetPasswordRequestFailed: boolean,
}

const initialState: InitialStateT = {
  isAuthChecked: false,
  userInfo: null,

  registrationRequest: false,
  registrationRequestFailed: false,

  loginRequest: false,
  loginRequestFailed: false,

  getUserRequest: false,
  getUserRequestFailed: false,

  updateUserRequest: false,
  updateUserRequestFailed: false,

  logoutRequest: false,
  logoutRequestFailed: false,

  forgotPasswordRequest: false,
  forgotPasswordRequestFailed: false,
  email: '',

  resetPasswordRequest: false,
  resetPasswordRequestFailed: false,
};

export const requestReducer = (
  state = initialState,
  action: RequestsActions
): InitialStateT => {
  switch (action.type) {

    case UserRequest.LOGIN:
      return {
        ...state,
        loginRequest: true,
        loginRequestFailed: false,
        isAuthChecked: false,
      }
    case UserRequest.LOGIN_SUCCESS:
      return {
        ...state,
        loginRequest: true,
        userInfo: action.payload.user,
        isAuthChecked: true,
      }
    case UserRequest.LOGIN_FAILED:
      return {
        ...state,
        loginRequest: false,
        loginRequestFailed: true,
        isAuthChecked: false,
      }

    case UserRequest.LOGOUT:
      return {
        ...state,
        logoutRequest: true,
        logoutRequestFailed: false,
      }
    case UserRequest.LOGOUT_SUCCESS:
      return {
        ...state,
        logoutRequest: true,
        userInfo: null,
        isAuthChecked: false,
      }
    case UserRequest.LOGOUT_FAILED:
      return {
        ...state,
        logoutRequest: false,
        logoutRequestFailed: true,
        isAuthChecked: false,
      }

    case UserRequest.UPDATE_USER_DATA:
      return {
        ...state,
        updateUserRequest: true,
        updateUserRequestFailed: false,
      }
    case UserRequest.UPDATE_USER_DATA_SUCCESS:
      return {
        ...state,
        updateUserRequest: false,
        userInfo: action.payload
      }
    case UserRequest.UPDATE_USER_DATA_FAILED:
      return {
        ...state,
        updateUserRequest: false,
        updateUserRequestFailed: true,
      }

    case UserRequest.REGISTRATION:
      return {
        ...state,
        registrationRequest: true,
        registrationRequestFailed: false,
        isAuthChecked: false,
      }
    case UserRequest.REGISTRATION_SUCCESS:
      return {
        ...state,
        registrationRequest: true,
        userInfo: action.payload.user,
        isAuthChecked: true,
      }
    case UserRequest.REGISTRATION_FAILED:
      return {
        ...state,
        registrationRequest: false,
        registrationRequestFailed: true,
        isAuthChecked: false,
      }

    case UserRequest.RESET_PASSWORD:
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordRequestFailed: false,
      }
    case UserRequest.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordRequest: false,
      }
    case UserRequest.RESET_PASSWORD_FAILED:
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordRequestFailed: true,
      }

    case UserRequest.FORGOT_PASSWORD:
      return {
        ...state,
        forgotPasswordRequest: true,
        forgotPasswordRequestFailed: false,
      }
    case UserRequest.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordRequest: false,
        email: action.payload,
      }
    case UserRequest.FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordRequestFailed: true,
      }

    case UserRequest.GET_USER:
      return {
        ...state,
        getUserRequest: true,
        getUserRequestFailed: false,
      }
    case UserRequest.GET_USER_SUCCESS:
      return {
        ...state,
        getUserRequest: false,
        userInfo: action.payload
      }
    case UserRequest.GET_USER_FAILED:
      return {
        ...state,
        getUserRequest: false,
        getUserRequestFailed: true,
      }
    case UserRequest.AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: true,
      }

    default:
      return state
  }
}
