import React, {useEffect} from 'react';
import feedStyles from './styles.module.css';
import OrdersFeed from "../../components/OrdersFeed/OrdersFeed";
import OrdersDashboard from "../../components/OrdersDashboard/OrdersDashboard";
import {useAppDispatch} from "../../utils/types";
import {WS_URL} from "../../utils/constants";
import {WSE} from "../../services/actions/ws";

export const FeedPage = () => {
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
  }, []);

  return (
    <>
      <div className={feedStyles.heading}>
        <h1 className="text text_type_main-large">Лента заказов</h1>
      </div>
      <main className={feedStyles.main}>
        <section className={feedStyles.mainSection}>
          <OrdersFeed/>
        </section>
        <section className={feedStyles.mainSection}>
          <OrdersDashboard/>
        </section>
      </main>
    </>
  );
};
