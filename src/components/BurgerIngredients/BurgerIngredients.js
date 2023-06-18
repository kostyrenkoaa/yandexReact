import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import styles from './BurgerIngredients.module.css';
import {Tab, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {cardPropTypes} from '../../utils/prop-types';


function MenuList({type, ingredients}) {
  const [modalActive, setModalActive] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState();

  const items = ingredients.filter(item => item.type === type);

  const openModal = (e) => {
    setModalActive(true);
    setCurrentIngredient(
      items.find((i) => i._id === e.currentTarget?.attributes?.getNamedItem('data-id')?.value)
    )
  };

  const closeModal = () => {
    setModalActive(false);
    setCurrentIngredient()
  };

  return (
    <>
      <div className={`${styles.menuItems}`}>
        {items.map(item => (
          <article
            className={styles.card}
            onClick={openModal}
            data-id={item._id}
            key={item._id}
          >
            <img src={item.image} alt={item.name} className='ml-4 mr-4 mb-1'/>
            <div className={`${styles.priceItem} mt-1 mb-1`}>
              <span className='text text_type_digits-default mr-1'>{item.price}</span>
              <CurrencyIcon type='primary'/>
            </div>
            <span className={styles.name}>{item.name}</span>
          </article>
        ))}
      </div>
      {modalActive && currentIngredient &&
        <Modal title='Детали ингредиента' onRequestClose={closeModal}>
          <IngredientDetails ingredient={currentIngredient}/>
        </Modal>
      }
    </>
  );
}

MenuList.propTypes = {
  type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
  ingredients: PropTypes.arrayOf(cardPropTypes).isRequired,
};

export default function BurgerIngredients({ingredients}) {
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
            <MenuList type='bun' ingredients={ingredients}/>
          </li>
          <li>
            <h2 className='text text_type_main-medium mt-10 mb-6'>Соусы</h2>
            <MenuList type='sauce' ingredients={ingredients}/>
          </li>
          <li>
            <h2 className='text text_type_main-medium mt-10 mb-6'>Начинки</h2>
            <MenuList type='main' ingredients={ingredients}/>
          </li>
        </ul>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(cardPropTypes).isRequired,
};
