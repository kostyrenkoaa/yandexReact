import React, {useEffect} from 'react';
import styles from './OrdersFeed.module.css';
import {OrderT, useAppDispatch, useAppSelector} from '../../utils/types';
import {WS_URL} from "../../utils/constants";
import {WSE} from "../../services/actions/ws";
import OrdersFeedItem from "../OrdersFeedItem/OrdersFeedItem";
import {Link, useLocation} from 'react-router-dom';

export default function OrdersFeed() {
  const dispatch = useAppDispatch();
  const wsUrl = WS_URL + '/orders/all';

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
  }, [dispatch, wsUrl]);

  const {orders, hasMsg} = useAppSelector(store => store.ws);
  const location = useLocation();

  return (
    <div className={`${styles.container} pr-2`}>
      {hasMsg && orders?.map((order: OrderT) => (
        <Link
          to={`/feed/${order.number}`}
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
            displayStatus={false}
          />
        </Link>
      ))}
    </div>
  );
};
