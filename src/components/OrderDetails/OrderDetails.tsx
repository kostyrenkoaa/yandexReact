// @ts-ignore
import done from '../../images/done.svg';
import styles from './OrderDetails.module.css';
import {useAppSelector} from "../../utils/types";

export default function OrderDetails() {
  const orderNumber = useAppSelector(store => store.order.order);

  return (
    <section className='pt-30 pr-25 pb-30 pl-25'>
      <h2 className={`${styles.title} text text_type_digits-large pb-8`}>
        {orderNumber}
      </h2>
      <p className='styles.test text text_type_main-medium  pb-15'>
        идентификатор заказа
      </p>
      <img className='pb-15' src={done} alt='done icon'/>
      <p className='text text_type_main-default pb-2'>
        Ваш заказ начали готовить
      </p>
      <p className='text text_type_main-default text_color_inactive'>
        Дождитесь готовности на орбитальной станции
      </p>
    </section>
  );
}
