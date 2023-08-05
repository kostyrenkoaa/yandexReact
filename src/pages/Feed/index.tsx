import React from 'react';
import feedStyles from './styles.module.css';
import OrdersFeed from "../../components/OrdersFeed/OrdersFeed";
import OrdersDashboard from "../../components/OrdersDashboard/OrdersDashboard";

export const FeedPage = () => {
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
