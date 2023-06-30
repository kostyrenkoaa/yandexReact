import {request} from '../../utils/api';
import {BASE_URL} from '../../utils/constants';
import {getCookie, setCookie, deleteCookie} from '../../utils/cookie';
import {fetchWithRefresh} from '../../utils/api-auth'

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const UPDATE_USER_DATA_SUCCESS = 'UPDATE_USER_DATA_SUCCESS';
export const UPDATE_USER_DATA_FAILED = 'UPDATE_USER_DATA_FAILED';

export const REGISTRATION = 'REGISTRATION';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const GET_USER = 'GET_USER';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const AUTH_CHECKED = 'AUTH_CHECKED';


const getUser = () => (dispatch) => {
  dispatch({
    type: GET_USER
  })
  return fetchWithRefresh(`${BASE_URL}/auth/user`)
    .then(res => {
      if (res.success) {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: res.user
        })
      }
    })
    .catch((err) => {
      dispatch({
        type: GET_USER_FAILED
      })
      err.message && console.log(`Ошибка запроса ${err.message}`)
      !err.message && console.log(err)
    })
};

export const checkAuth = () => (dispatch) => {
  if (getCookie('accessToken')) {
    dispatch(getUser())
      .finally(() => {
        dispatch({
          type: AUTH_CHECKED
        })
      })
  } else {
    dispatch({
      type: AUTH_CHECKED
    })
  }
};

export const logInRequest = (form) => {
  return function (dispatch) {
    dispatch({
      type: LOGIN
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
            type: LOGIN_SUCCESS,
            payload: res
          });

          setCookie('accessToken', res.accessToken)
          localStorage.setItem('refreshToken', res.refreshToken)
        }
      })
      .catch((err) => {
        console.log(`Ошибка запроса ${err}`);
        dispatch({
          type: LOGIN_FAILED
        });
      })
  }
};

export const logOutRequest = (refreshToken) => {
  return function (dispatch) {
    dispatch({
      type: LOGOUT
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
            type: LOGOUT_SUCCESS,
          })

          localStorage.removeItem('refreshToken')
          deleteCookie('accessToken')
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGOUT_FAILED
        })
        console.log(`Ошибка запроса ${err}`)
      })
  }
}

export const saveUserData = (accessToken, name, email, password) => {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_DATA
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
            type: UPDATE_USER_DATA_SUCCESS,
            payload: res.user
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_USER_DATA_FAILED
        })
        console.log(`Ошибка запроса ${err}`)
      })
  }
}

export const registerUserRequest = (form, redirect) => {
  return (dispatch) => {
    dispatch({
      type: REGISTRATION
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
            type: REGISTRATION_SUCCESS,
            payload: res
          });

          localStorage.setItem('refreshToken', res.refreshToken)
          redirect()
        }
      })
      .catch((err) => {
        console.log(`Ошибка запроса ${err}`)
        dispatch({
          type: REGISTRATION_FAILED
        });
      });
  }
}

export const settingNewPasswordRequest = (form, redirect) => {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD
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
            type: RESET_PASSWORD_SUCCESS
          })
          redirect();
        }
      })
      .catch((err) => {
        dispatch({
          type: RESET_PASSWORD_FAILED
        })
        console.log(`Ошибка запроса ${err}`)
      })
  }
};

export const resetPasswordRequest = (form, redirect) => {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD
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
            type: FORGOT_PASSWORD_SUCCESS,
            payload: res.success
          });
          redirect();
        }
      })
      .catch((err) => {
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
        });
        console.log(`Ошибка запроса ${err}`)
      })
  }
};