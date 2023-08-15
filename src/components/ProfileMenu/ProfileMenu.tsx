import {useCallback} from 'react';
import styles from './ProfileMenu.module.css';
import {logOutRequest} from '../../services/actions/requests';
import {NavLink} from 'react-router-dom';
import {useAppDispatch} from "../../utils/types";
import React, {ReactNode, ReactElement} from 'react';

type ProfileMenu = {
  children: ReactNode | ReactElement;
  info: string;
}

export const ProfileMenu = ({children, info}: ProfileMenu) => {
  const dispatch = useAppDispatch();


  const logOut = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    dispatch(logOutRequest(refreshToken))
  }

  const classNameForNav = useCallback((infoMenuitem: { isActive: boolean; }) => {
      return !infoMenuitem.isActive ? styles.button : `${styles.link_active} ${styles.button}`
    }, []
  );

  return (
    <div className={styles.container}>
      <nav className={styles.description}>
        <NavLink to='/profile' className={classNameForNav}>
          Профиль
        </NavLink>
        <NavLink to='/profile/orders' className={classNameForNav}>
          История заказов
        </NavLink>
        <NavLink to='/login' onClick={logOut} className={styles.button}>
          Выход
        </NavLink>
        <p className={`${styles.info} mt-20`}>{info}</p>
      </nav>

      <div>
        {children}
      </div>
    </div>
  )
};
