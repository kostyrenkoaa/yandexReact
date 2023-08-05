import React, {useState, useMemo, UIEvent } from 'react';
import PropTypes from 'prop-types';
// @ts-ignore
import styles from './BurgerIngredients.module.css';
import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentIngredient} from '../../services/actions/currentIngredient';
import {useDrag} from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import {IngredientTypeT, IngredientT} from "../../utils/types";


type CardProps = {
    ingredient: IngredientT,
    count: number,
}

function Card({ingredient, count}: CardProps) {
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  });

  const dispatch = useDispatch();
  const location = useLocation();

  const openModal = () => {
    // @ts-ignore
      dispatch(getCurrentIngredient(ingredient))
  };

  return (
    <>
      <Link
        to={`/ingredients/${ingredient._id}`}
        state={{background: location}}
        className={styles.card}
        onClick={openModal}
        ref={dragRef}
      >
        {(count > 0) && (<Counter count={count} size="default"/>)}
        <img src={ingredient.image} alt={ingredient.name} className='ml-4 mr-4 mb-1'/>
        <div className={`${styles.priceItem} mt-1 mb-1`}>
          <span className='text text_type_digits-default mr-1'>{ingredient.price}</span>
          <CurrencyIcon type='primary'/>
        </div>
        <span className={styles.name}>{ingredient.name}</span>
      </Link>
    </>
  );
}

type MenuListProps = {
    type: IngredientTypeT
}

function MenuList({type}: MenuListProps) {
  // @ts-ignore
    const {items, bun} = useSelector(store => store.items);

  const counter = useMemo(() => {
    const counts: any = {};

    items.forEach((item: IngredientT) => {
      if (!counts[item._id]) {
        counts[item._id] = 0;
      }
      counts[item._id]++;
    });
    if (bun) {
      counts[bun._id] = 2;
    }
    return counts;
  }, [items, bun]);

  // @ts-ignore
    const {ingredients} = useSelector(store => store.ingredients);
  const typeData = ingredients.filter((item: IngredientT) => item.type === type);

  return (
    <div className={`${styles.menuItems}`}>
      {typeData.map((item: IngredientT) => (
        <Card key={item._id} ingredient={item} count={counter[item._id]}/>
      ))}
    </div>
  );
}

export default function BurgerIngredients() {
  const [current, setCurrent] = useState('bun')

  const setTabScroll = (evt: UIEvent<HTMLDivElement>) => {
    const scrollTop = evt.currentTarget.scrollTop;

    if (scrollTop <= 250) {
      setCurrent('bun');
    } else if (scrollTop > 250 && scrollTop <= 750) {
      setCurrent('sauce');
    } else {
      setCurrent('main');
    }
  }

  return (
    <section className={styles.main}>
      <h1 className='mt-10 mb-5 text text_type_main-large'>Соберите бургер</h1>

      <div className={styles.tab}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.window} custom-scroll`} onScroll={setTabScroll}>
        <ul className={styles.menu}>
          <li>
            <h2 className='text text_type_main-medium mt-10 mb-6'>Булки</h2>
            <MenuList type={IngredientTypeT.BUN}/>
          </li>
          <li>
            <h2 className='text text_type_main-medium mt-10 mb-6'>Соусы</h2>
            <MenuList type={IngredientTypeT.SAUCE}/>
          </li>
          <li>
            <h2 className='text text_type_main-medium mt-10 mb-6'>Начинки</h2>
            <MenuList type={IngredientTypeT.MAIN}/>
          </li>
        </ul>
      </div>
    </section>
  );
}

