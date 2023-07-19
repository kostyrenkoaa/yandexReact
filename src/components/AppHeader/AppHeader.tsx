import {ProfileIcon, BurgerIcon, ListIcon, Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import {NavLink} from 'react-router-dom';
import {useCallback} from 'react';
import React from 'react';
// @ts-ignore
import styles from './AppHeader.module.css';

export default function AppHeader() {

  const classNameForNav = useCallback((infoMenuitem: { isActive: any; }) => {
      return !infoMenuitem.isActive ? `${styles.item} p-5` : `${styles.link_active} ${styles.item} p-5`
    }, []
  );

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navUl}>
          <li className={`${styles.constructor} mr-2`}>
            <NavLink to='/' className={classNameForNav}>
              <BurgerIcon type='primary'/>
              <p className={`ml-2 text text_type_main-default`}>
                Конструктор
              </p>
            </NavLink>
          </li>
          <li>
            <NavLink to='/orders' className={classNameForNav}>
              <ListIcon type='primary'/>
              <p className={`ml-2 text text_type_main-default`}>
                Лента заказов
              </p>
            </NavLink>
          </li>
        </ul>
      </nav>
      <Logo/>
      <NavLink to='/profile' className={classNameForNav}>
        <ProfileIcon type='primary'/>
        <p className={`ml-2 text text_type_main-default`}>
          Личный кабинет
        </p>
      </NavLink>
    </header>
  )
}
