import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {ConstructorElement, CurrencyIcon, DragIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import {cardPropTypes} from '../../utils/prop-types';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';

function Item({cardData}) {
  return (
    <div
      className={styles.item}>
      <DragIcon type="primary"/>
      <ConstructorElement
        text={cardData.name}
        price={cardData.price}
        thumbnail={cardData.image}
      />
    </div>
  )
}

Item.propTypes = {
  cardData: cardPropTypes.isRequired,
};

function OrderTotal() {
  const [modalActive, setModalActive] = useState(false);

  const openModal = () => {
    setModalActive(true);
  };

  const closeModal = () => {
    setModalActive(false);
  };

  return (
    <>
      <div className={`${styles.order} mt-10`}>
        <div className={`${styles.price} mr-10`}>
          <span className="text text_type_digits-medium mr-4">610</span>
          <CurrencyIcon type="primary"/>
        </div>
        <Button type="primary" size="large" onClick={openModal} htmlType='button'>
          Оформить заказ
        </Button>
      </div>
      {modalActive &&
        <Modal onRequestClose={closeModal}>
          <OrderDetails/>
        </Modal>
      }
    </>
  );
}

export default function BurgerConstructor({ingredients}) {
  const bun = ingredients.find((i) => i?.type === 'bun');

  return (
    <section className={`${styles.main} mt-25`}>
      <ul className={`${styles.items} pl-4`}>
        <li className={`${styles.list} ml-5`}>
          {Boolean(bun) &&
            <ConstructorElement
              type='top'
              isLocked={true}
              text={bun.name + ' (верх)'}
              price={bun.price}
              thumbnail={bun.image}
            />
            }
        </li>

        <li className={`${styles.list} ${styles.window} custom-scroll`}>
          {
            ingredients.filter((i) => i.type !== 'bun').map((item, index) => {
              return (
                <Item cardData={item} key={item._id}/>
              );
            })
          }
        </li>

        <li className={`${styles.list} ml-5`}>
          {Boolean(bun) &&
            <ConstructorElement
              type='bottom'
              isLocked={true}
              text={bun.name + ' (низ)'}
              price={bun.price}
              thumbnail={bun.image}
            />
          }
        </li>

      </ul>
      <OrderTotal/>
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(cardPropTypes).isRequired,
};
