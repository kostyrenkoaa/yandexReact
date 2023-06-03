import React, {useEffect, useState} from 'react';
import {BASE_URL} from '../../utils/constants';
import {getItems} from '../../utils/data';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import styles from './App.module.css';

export default function App() {
  const [ingredients, setIngredients] = useState([])

  const isOffline = false; //todo вынести в env

  useEffect(() => {
    if (isOffline) {
      setIngredients(getItems())
    } else {
      fetch(`${BASE_URL}/ingredients`)
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(res => {
          if (res && res.success && res.data) {
            setIngredients(res.data)
          } else {
            console.log('Ошибка загрузки данных')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }

  }, [])

  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={styles.main}>
        <BurgerIngredients ingredients={ingredients}/>
        <BurgerConstructor ingredients={ingredients}/>
      </main>
    </div>
  );
}
