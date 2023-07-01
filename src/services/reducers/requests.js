import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,

  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,

  UPDATE_USER_DATA,
  UPDATE_USER_DATA_SUCCESS,
  UPDATE_USER_DATA_FAILED,

  REGISTRATION,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,

  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,

  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,

  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILED,

  AUTH_CHECKED,

} from '../actions/requests'


const initialState = {
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
  email: false,

  resetPasswordRequest: false,
  resetPasswordRequestFailed: false,
};

export const requestReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOGIN:
      return {
        ...state,
        loginRequest: true,
        loginRequestFailed: false,
        isAuthChecked: false,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginRequest: true,
        userInfo: action.payload.user,
        isAuthChecked: true,
      }
    case LOGIN_FAILED:
      return {
        ...state,
        loginRequest: false,
        loginRequestFailed: true,
        isAuthChecked: false,
      }

    case LOGOUT:
      return {
        ...state,
        logoutRequest: true,
        logoutRequestFailed: false,
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        logoutRequest: true,
        userInfo: null,
        isAuthChecked: false,
      }
    case LOGOUT_FAILED:
      return {
        ...state,
        logoutRequest: false,
        logoutRequestFailed: true,
        isAuthChecked: false,
      }

    case UPDATE_USER_DATA:
      return {
        ...state,
        updateUserRequest: true,
        updateUserRequestFailed: false,
      }
    case UPDATE_USER_DATA_SUCCESS:
      return {
        ...state,
        updateUserRequest: false,
        userInfo: action.payload
      }
    case UPDATE_USER_DATA_FAILED:
      return {
        ...state,
        updateUserRequest: false,
        updateUserRequestFailed: true,
      }

    case REGISTRATION:
      return {
        ...state,
        registrationRequest: true,
        registrationRequestFailed: false,
        isAuthChecked: false,
      }
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        registrationRequest: true,
        userInfo: action.payload.user,
        isAuthChecked: true,
      }
    case REGISTRATION_FAILED:
      return {
        ...state,
        registrationRequest: false,
        registrationRequestFailed: true,
        isAuthChecked: false,
      }

    case RESET_PASSWORD:
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordRequestFailed: false,

      }
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordRequest: false,
      }
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordRequestFailed: true,
      }

    case FORGOT_PASSWORD:
      return {
        ...state,
        forgotPasswordRequest: true,
        forgotPasswordRequestFailed: false,

      }
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordRequest: false,
        email: action.payload,
      }
    case FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordRequestFailed: true,
      }

    case GET_USER:
      return {
        ...state,
        getUserRequest: true,
        getUserRequestFailed: false,
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        getUserRequest: false,
        userInfo: action.payload
      }
    case GET_USER_FAILED:
      return {
        ...state,
        getUserRequest: false,
        getUserRequestFailed: true,
      }
    case AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: true,
      }

    default:
      return state
  }
}
