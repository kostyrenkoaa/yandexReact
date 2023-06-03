import {ProfileIcon, BurgerIcon, ListIcon, Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './AppHeader.module.css';

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navUl}>
          <li className={`${styles.constructor} mr-2`}>
            <a href='#' className={`${styles.item} p-5`}>
              <BurgerIcon type='primary'/>
              <p className={`ml-2 text text_type_main-default`}>
                Конструктор
              </p>
            </a>
          </li>
          <li>
            <a href='#' className={`${styles.item} p-5`}>
              <ListIcon type='primary'/>
              <p className={`ml-2 text text_type_main-default`}>
                Лента заказов
              </p>
            </a>
          </li>
        </ul>
      </nav>
      <Logo/>
      <a href='#' className={`${styles.item} p-5`}>
        <ProfileIcon type='primary'/>
        <p className={`ml-2 text text_type_main-default`}>
          Личный кабинет
        </p>
      </a>
    </header>
  )
}
