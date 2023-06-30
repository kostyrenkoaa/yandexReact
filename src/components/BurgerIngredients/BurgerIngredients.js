import React, {useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import styles from './BurgerIngredients.module.css';
import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import {cardPropTypes} from '../../utils/prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentIngredient} from '../../services/actions/currentIngredient';
import {CLOSE_MODAL} from '../../services/actions/currentIngredient';
import {useDrag} from 'react-dnd';


function Card({ingredient, count}) {
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  });

  const [modalActive, setModalActive] = useState(false);
  const dispatch = useDispatch();

  const openModal = () => {
    setModalActive(true);
    dispatch(getCurrentIngredient(ingredient))
  };

  const closeModal = () => {
    setModalActive(false);
    dispatch({
      type: CLOSE_MODAL
    });
  };

  const modalIngredients = (
    <Modal title='Детали ингредиента' onRequestClose={closeModal}>
      <IngredientDetails/>
    </Modal>
  );

  return (
    <>
      <article
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
      </article>
      {modalActive && modalIngredients}
    </>
  );
}

Card.propTypes = {
  ingredient: cardPropTypes.isRequired,
  count: PropTypes.number,
};


function MenuList({type}) {

  const {items, bun} = useSelector(store => store.items);

  const counter = useMemo(() => {
    const counts = {};

    items.forEach((item) => {
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

  const {ingredients} = useSelector(store => store.ingredients);
  const typeData = ingredients.filter(item => item.type === type);

  return (
    <div className={`${styles.menuItems}`}>
      {typeData.map(item => (
        <Card key={item._id} ingredient={item} count={counter[item._id]}/>
      ))}
    </div>
  );
}

MenuList.propTypes = {
  type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
};

export default function BurgerIngredients() {
  const [current, setCurrent] = useState('bun')

  const setTabScroll = (evt) => {
    const scrollTop = evt.target.scrollTop;

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
            <MenuList type='bun'/>
          </li>
          <li>
            <h2 className='text text_type_main-medium mt-10 mb-6'>Соусы</h2>
            <MenuList type='sauce'/>
          </li>
          <li>
            <h2 className='text text_type_main-medium mt-10 mb-6'>Начинки</h2>
            <MenuList type='main'/>
          </li>
        </ul>
      </div>
    </section>
  );
}

