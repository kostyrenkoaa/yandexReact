import styles from './IngredientDetails.module.css';
import {useSelector} from 'react-redux';

export default function IngredientDetails() {
  const {currentIngredient} = useSelector(store => store.currentIngredient);

  return (
    <section className={` ${styles.section} pt-10 pb-15 pl-10 pr-10`}>
      <img className='pb-4 pt-10' src={currentIngredient.image_large}/>
      <p className={` ${styles.name} text text_type_main-medium pb-8`}>
        {currentIngredient.name}
      </p>
      <ul className={`${styles.details} `}>
        <li className={`${styles.item} mr-5`}>
          <p className='text text_type_main-default text_color_inactive'>
            Каллории,ккал
          </p>
          <span className='text text_type_digits-default text_color_inactive'>
            {currentIngredient.calories}
          </span>
        </li>
        <li className={`${styles.item}`}>
          <p className='text text_type_main-default text_color_inactive'>
            Белки,г
          </p>
          <span className='text text_type_digits-default text_color_inactive'>
            {currentIngredient.proteins}
          </span>
        </li>
        <li className={`${styles.item}`}>
          <p className='text text_type_main-default text_color_inactive'>
            Жиры,г
          </p>
          <span className='text text_type_digits-default text_color_inactive'>
            {currentIngredient.fat}
          </span>
        </li>
        <li className={`${styles.item}`}>
          <p className='text text_type_main-default text_color_inactive'>
            Углеводы,г
          </p>
          <span className='text text_type_digits-default text_color_inactive'>
            {currentIngredient.carbohydrates}
          </span>
        </li>
      </ul>
    </section>
  );
}
