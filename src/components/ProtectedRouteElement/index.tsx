import {Navigate} from 'react-router-dom';
import {useLocation} from "react-router-dom";
import React, {ReactNode, ReactElement} from 'react';
import {useAppSelector} from "../../utils/types";

const USER_PROTECTED_URL_KEY = 'userProtectedUrl';
type ProtectedRouteElementProps = {
  forAuth: boolean;
  children: ReactNode | ReactElement | any;
}

export const ProtectedRouteElement = ({forAuth, children}: ProtectedRouteElementProps) => {
  const location = useLocation();
  const userInfo = useAppSelector(state => state.requests.userInfo);

  if (forAuth && !userInfo) {
    if (location.pathname !== '/login') {
      saveUrlProtect(location.pathname)
    }
    return <Navigate to='/login'/>
  }

  if (!forAuth && userInfo) {
    const urlProtect = localStorage.getItem(USER_PROTECTED_URL_KEY) ?? '';
    return <Navigate to={urlProtect ? urlProtect : '/'}/>
  }

  return children
};

export const saveUrlProtect = (url: string) => {
  localStorage.setItem(USER_PROTECTED_URL_KEY, url);
}
