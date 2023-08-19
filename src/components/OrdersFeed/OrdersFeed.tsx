import React from 'react';
import styles from './OrdersFeed.module.css';
import {OrderT, useAppSelector} from '../../utils/types';
import OrdersFeedItem from "../OrdersFeedItem/OrdersFeedItem";
import {Link, useLocation} from 'react-router-dom';

export default function OrdersFeed() {
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
