import React, {useEffect} from 'react';
import styles from './styles.module.css';
import {OrderT, useAppDispatch, useAppSelector} from '../../utils/types';
import {WSE} from '../../services/actions/ws';
import {WS_URL} from '../../utils/constants';
import {getCookie} from '../../utils/cookie';
import OrdersFeedItem from '../../components/OrdersFeedItem/OrdersFeedItem';
import {useLocation, Link, NavLink} from 'react-router-dom';
import {ProfileMenu} from "../../components/ProfileMenu/ProfileMenu";

export default function Orders() {
  const dispatch = useAppDispatch();
  const wsUrl = WS_URL + '/orders?token=' + getCookie('accessToken');

  useEffect(() => {
    dispatch({
      type: WSE.START,
      payload: wsUrl
    });

    return () => {
      dispatch({
        type: WSE.CLOSED
      });
    };
  }, []);

  const {orders, hasMsg} = useAppSelector(store => store.ws);

  const location = useLocation();

  return (
    <ProfileMenu
      info="В этом разделе вы можете просмотреть свою историю заказов"
      children={
        <div className={`${styles.profileOrdersContainer} pr-2`}>
          {hasMsg && orders?.map((order: OrderT) => (

            <Link
              to={`/profile/orders/${order.number}`}
              state={{background: location}}
              className={styles.card}
              key={order._id}
            >
              <OrdersFeedItem
                ingredientList={order.ingredients}
                name={order.name}
                number={order.number}
                status={order.status}
                updatedAt={order.updatedAt}
                _id={order._id}
                displayStatus={true}
              />
            </Link>
          ))}
        </div>
      }
    />
  )
};
