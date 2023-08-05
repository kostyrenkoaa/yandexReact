import React, {useState, useMemo, useRef, LegacyRef} from 'react';
import {useDrag, useDrop} from 'react-dnd';
import {ConstructorElement, CurrencyIcon, DragIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
// @ts-ignore
import styles from './BurgerConstructor.module.css';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import {useSelector, useDispatch} from 'react-redux';
import {addToConstructor, deleteIngredient, sortIngredient} from '../../services/actions/constructor';
import {postOrder, OrderE} from '../../services/actions/order';
import {useNavigate} from "react-router-dom";
import {IngredientT} from "../../utils/types";

function OrderTotal() {
  // @ts-ignore
    const {items, bun}: {items: IngredientT[], bun: IngredientT} = useSelector(store => store.items);
  // @ts-ignore
    const ingredients: IngredientT[] = useSelector(store => store.ingredients.ingredients);
  // @ts-ignore
    const userInfo = useSelector(state => state.requests.userInfo)
  const [modalActive, setModalActive] = useState(false);
  const [isLoaders, setIsLoaders] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openModal = () => {
    if (!userInfo) {
      return navigate('/login')
    }

    setIsLoaders(true)
    // @ts-ignore
      dispatch(postOrder(
      ingredients, () => {
        setModalActive(true);
        setIsLoaders(false)
      }
    ));
  };

  const closeModal = () => {
    setModalActive(false);
    dispatch({
      type: OrderE.RESET
    })
  };

  const total = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;

    return (
      items.reduce((acc, item) => acc + item.price, 0) + bunPrice
    );
  }, [items, bun]);


  return (
    <>
      <div className={`${styles.order} mt-10`}>
        <div className={`${styles.price} mr-10`}>
          <span className="text text_type_digits-medium mr-4">{total}</span>
          <CurrencyIcon type="primary"/>
        </div>
        {!isLoaders &&
          <Button
            type="primary"
            size="large"
            onClick={openModal}
            htmlType='button'
            disabled={(!(bun && items.length))}>
            Оформить заказ
          </Button>
        }

        {isLoaders && 'Оформляем...'}

      </div>
      {modalActive &&
        <Modal onRequestClose={closeModal} children={<OrderDetails/>} title=''/>
      }
    </>
  );
}


type ItemProps = {
    cardData: IngredientT,
    index: number,
};

function Item({cardData, index}: ItemProps) {
  const dispatch = useDispatch();

  const handleDeleteIngredient = (index: number) => {
    dispatch(deleteIngredient(index))
  }

  const [, dragRef] = useDrag({
    type: 'item',
    item: {index}
  });

  const [, dropRef] = useDrop({
    accept: 'item',
    drop(dragObject: {index: number}) {
      if (dragObject.index === index) {
        return
      }
      dispatch(sortIngredient(dragObject.index, index))
    }
  })

  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));

  return (
    <div
      ref={ dragDropRef as LegacyRef<any>}
      className={styles.item}>
      <DragIcon type="primary"/>
      <ConstructorElement
        text={cardData.name}
        price={cardData.price}
        thumbnail={cardData.image}
        handleClose={() => handleDeleteIngredient(index)}
      />
    </div>
  )
}

function Section() {
  const dispatch = useDispatch();
  // @ts-ignore
    const {items, bun}: {items: IngredientT[], bun: IngredientT} = useSelector(store => store.items);
    const [, dropTarget] = useDrop(() => ({
    accept: 'ingredient',
        // @ts-ignore
    drop: (item) => dispatch(addToConstructor(item)),
  }));

  return (
    <ul className={`${styles.items} pl-4`} ref={dropTarget}>
      <li className={`${styles.list} ml-5`}>
        {bun
          ?
          <ConstructorElement
            type='top'
            isLocked={true}
            text={bun.name + ' (верх)'}
            price={bun.price}
            thumbnail={bun.image}
          />
          : ''}
      </li>

      <li className={`${styles.list} ${styles.window} custom-scroll`}>
        {items.length > 0
          ? (
            items.map((item, index) => {
              return (
                <Item
                  cardData={item}
                  key={item?.id}
                  index={index}
                />
              );
            })
          )
          : ''}
      </li>

      <li className={`${styles.list} ml-5`}>
        {bun
          ?
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={bun.name + ' (низ)'}
            price={bun.price}
            thumbnail={bun.image}
          />
          : ''}
      </li>
    </ul>
  );
}

export default function BurgerConstructor() {
  return (
    <section className={`${styles.main} mt-25`}>
      <Section/>
      <OrderTotal/>
    </section>
  );
}
