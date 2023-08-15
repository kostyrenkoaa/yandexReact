import {request} from '../../utils/api';
import {BASE_URL} from '../../utils/constants';
import {getCookie, setCookie, deleteCookie} from '../../utils/cookie';
import {fetchWithRefresh} from '../../utils/api-auth'
import {AppDispatch, UserT} from "../../utils/types";

export enum UserRequest {
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILED = 'LOGIN_FAILED',
  LOGOUT = 'LOGOUT',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
  LOGOUT_FAILED = 'LOGOUT_FAILED',
  UPDATE_USER_DATA = 'UPDATE_USER_DATA',
  UPDATE_USER_DATA_SUCCESS = 'UPDATE_USER_DATA_SUCCESS',
  UPDATE_USER_DATA_FAILED = 'UPDATE_USER_DATA_FAILED',
  REGISTRATION = 'REGISTRATION',
  REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS',
  REGISTRATION_FAILED = 'REGISTRATION_FAILED',
  RESET_PASSWORD = 'RESET_PASSWORD',
  RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS',
  RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS',
  FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED',
  GET_USER = 'GET_USER',
  GET_USER_SUCCESS = 'GET_USER_SUCCESS',
  GET_USER_FAILED = 'GET_USER_FAILED',
  AUTH_CHECKED = 'AUTH_CHECKED',
}

export interface LoginAction {
  readonly type: typeof UserRequest.LOGIN;
}

export interface LoginSuccessAction {
  readonly type: typeof UserRequest.LOGIN_SUCCESS;
  readonly payload: { user: UserT };
}

export interface LoginFailedAction {
  readonly type: typeof UserRequest.LOGIN_FAILED;
}

export interface LogoutAction {
  readonly type: typeof UserRequest.LOGOUT;
}

export interface LogoutSuccessAction {
  readonly type: typeof UserRequest.LOGOUT_SUCCESS;
}

export interface LogoutFailedAction {
  readonly type: typeof UserRequest.LOGOUT_FAILED;
}

export interface UpdateUserDataAction {
  readonly type: typeof UserRequest.UPDATE_USER_DATA;
}

export interface UpdateUserDataSuccessAction {
  readonly type: typeof UserRequest.UPDATE_USER_DATA_SUCCESS;
  readonly payload: UserT;
}

export interface UpdateUserDataFailedAction {
  readonly type: typeof UserRequest.UPDATE_USER_DATA_FAILED;
}

export interface RegistrationAction {
  readonly type: typeof UserRequest.REGISTRATION;
}

export interface RegistrationSuccessAction {
  readonly type: typeof UserRequest.REGISTRATION_SUCCESS;
  readonly payload: { user: UserT };
}

export interface RegistrationFailedAction {
  readonly type: typeof UserRequest.REGISTRATION_FAILED;
}

export interface ResetPasswordAction {
  readonly type: typeof UserRequest.RESET_PASSWORD;
}

export interface ResetPasswordSuccessAction {
  readonly type: typeof UserRequest.RESET_PASSWORD_SUCCESS;
}

export interface ResetPasswordFailedAction {
  readonly type: typeof UserRequest.RESET_PASSWORD_FAILED;
}

export interface ForgotPasswordAction {
  readonly type: typeof UserRequest.FORGOT_PASSWORD;
}

export interface ForgotPasswordSuccessAction {
  readonly type: typeof UserRequest.FORGOT_PASSWORD_SUCCESS;
  readonly payload: string;
}

export interface ForgotPasswordFailedAction {
  readonly type: typeof UserRequest.FORGOT_PASSWORD_FAILED;
}

export interface GetUserAction {
  readonly type: typeof UserRequest.GET_USER;
}

export interface GetUserSuccessAction {
  readonly type: typeof UserRequest.GET_USER_SUCCESS;
  readonly payload: UserT;
}

export interface GetUserFailedAction {
  readonly type: typeof UserRequest.GET_USER_FAILED;
}

export interface AuthCheckedAction {
  readonly type: typeof UserRequest.AUTH_CHECKED;
}


export type RequestsActions =
  | LoginAction
  | LoginSuccessAction
  | LoginFailedAction
  | LogoutAction
  | LogoutSuccessAction
  | LogoutFailedAction
  | UpdateUserDataAction
  | UpdateUserDataSuccessAction
  | UpdateUserDataFailedAction
  | RegistrationAction
  | RegistrationSuccessAction
  | RegistrationFailedAction
  | ResetPasswordAction
  | ResetPasswordSuccessAction
  | ResetPasswordFailedAction
  | ForgotPasswordAction
  | ForgotPasswordSuccessAction
  | ForgotPasswordFailedAction
  | GetUserAction
  | GetUserSuccessAction
  | GetUserFailedAction
  | AuthCheckedAction


const getUser = () => (dispatch: AppDispatch) => {
  dispatch({
    type: UserRequest.GET_USER
  })
  return fetchWithRefresh(`${BASE_URL}/auth/user`)
    .then(res => {
      if (res.success) {
        dispatch({
          type: UserRequest.GET_USER_SUCCESS,
          payload: res.user
        })
      }
    })
    .catch((err) => {
      dispatch({
        type: UserRequest.GET_USER_FAILED
      })
      err.message && console.log(`Ошибка запроса ${err.message}`)
      !err.message && console.log(err)
    })
};

export const checkAuth = () => (dispatch: AppDispatch) => {
  if (getCookie('accessToken')) {
    dispatch(getUser())
      .finally(() => {
        dispatch({
          type: UserRequest.AUTH_CHECKED
        })
      })
  } else {
    dispatch({
      type: UserRequest.AUTH_CHECKED
    })
  }
};

export const logInRequest = (form: { email: string, password: string }) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: UserRequest.LOGIN
    });

    request(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        "Content-type": 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (res.success) {
          dispatch({
            type: UserRequest.LOGIN_SUCCESS,
            payload: res
          });

          setCookie('accessToken', res.accessToken.split('Bearer ')[1])
          localStorage.setItem('refreshToken', res.refreshToken)
        }
      })
      .catch((err) => {
        console.log(`Ошибка запроса ${err}`);
        dispatch({
          type: UserRequest.LOGIN_FAILED
        });
      })
  }
};

export const logOutRequest = (refreshToken: string | null) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: UserRequest.LOGOUT
    })
    request(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        "Content-type": 'application/json'
      },
      body: JSON.stringify({
        "token": refreshToken
      })
    })
      .then(res => {
        if (res.success) {
          dispatch({
            type: UserRequest.LOGOUT_SUCCESS,
          })

          localStorage.removeItem('refreshToken')
          deleteCookie('accessToken')
        }
      })
      .catch((err) => {
        dispatch({
          type: UserRequest.LOGOUT_FAILED
        })
        console.log(`Ошибка запроса ${err}`)
      })
  }
}

export const saveUserData = (accessToken: string | undefined, name: string, email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: UserRequest.UPDATE_USER_DATA
    })
    fetchWithRefresh(`${BASE_URL}/auth/user`, {
      method: 'PATCH',
      body: JSON.stringify({
        'name': name,
        'email': email,
        'password': password
      })
    })
      .then(res => {
        if (res.success) {
          dispatch({
            type: UserRequest.UPDATE_USER_DATA_SUCCESS,
            payload: res.user
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: UserRequest.UPDATE_USER_DATA_FAILED
        })
        console.log(`Ошибка запроса ${err}`)
      })
  }
}

export const registerUserRequest = (
  form: { email: string, password: string, name: string },
  redirect: { (): void; (): void; }
) => {

  return (dispatch: AppDispatch) => {
    dispatch({
      type: UserRequest.REGISTRATION
    })
    request(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        "Content-type": 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (res.success) {
          dispatch({
            type: UserRequest.REGISTRATION_SUCCESS,
            payload: res
          });

          localStorage.setItem('refreshToken', res.refreshToken)
          redirect()
        }
      })
      .catch((err) => {
        console.log(`Ошибка запроса ${err}`)
        dispatch({
          type: UserRequest.REGISTRATION_FAILED
        });
      });
  }
}

export const settingNewPasswordRequest = (form: { password: string, token: string; }, redirect: { (): void; (): void; }) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: UserRequest.RESET_PASSWORD
    })
    request(`${BASE_URL}/password-reset/reset`, {
      method: 'POST',
      headers: {
        "Content-type": 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (res.success) {
          dispatch({
            type: UserRequest.RESET_PASSWORD_SUCCESS
          })
          redirect();
        }
      })
      .catch((err) => {
        dispatch({
          type: UserRequest.RESET_PASSWORD_FAILED
        })
        console.log(`Ошибка запроса ${err}`)
      })
  }
};

export const resetPasswordRequest = (form: { email: string }, redirect: { (): void; (): void; }) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: UserRequest.FORGOT_PASSWORD
    });

    request(`${BASE_URL}/password-reset`, {
      method: 'POST',
      headers: {
        "Content-type": 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (res.success) {
          dispatch({
            type: UserRequest.FORGOT_PASSWORD_SUCCESS,
            payload: res.success
          });
          redirect();
        }
      })
      .catch((err) => {
        dispatch({
          type: UserRequest.FORGOT_PASSWORD_FAILED,
        });
        console.log(`Ошибка запроса ${err}`)
      })
  }
};
