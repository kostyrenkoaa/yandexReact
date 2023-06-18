import React, {useEffect} from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import {getIngredients} from '../../services/actions/ingredients';
import styles from './App.module.css';
import {useDispatch} from 'react-redux';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getIngredients());
    },
    [dispatch]
  );

  return (
    <div className={styles.app}>
      <AppHeader/>
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </main>
      </DndProvider>
    </div>
  );
}
