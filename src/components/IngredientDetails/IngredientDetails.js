import styles from './IngredientDetails.module.css';
import {cardPropTypes} from "../../utils/prop-types";

export default function IngredientDetails({ingredient}) {
  return (
    <section className={` ${styles.section} pt-10 pb-15 pl-10 pr-10`}>
      <img className='pb-4 pt-10' src={ingredient.image_large}/>
      <p className={` ${styles.name} text text_type_main-medium pb-8`}>
        {ingredient.name}
      </p>
      <ul className={`${styles.details} `}>
        <li className={`${styles.item} mr-5`}>
          <p className='text text_type_main-default text_color_inactive'>
            Каллории,ккал
          </p>
          <span className='text text_type_digits-default text_color_inactive'>
            {ingredient.calories}
          </span>
        </li>
        <li className={`${styles.item}`}>
          <p className='text text_type_main-default text_color_inactive'>
            Белки,г
          </p>
          <span className='text text_type_digits-default text_color_inactive'>
            {ingredient.proteins}
          </span>
        </li>
        <li className={`${styles.item}`}>
          <p className='text text_type_main-default text_color_inactive'>
            Жиры,г
          </p>
          <span className='text text_type_digits-default text_color_inactive'>
            {ingredient.fat}
          </span>
        </li>
        <li className={`${styles.item}`}>
          <p className='text text_type_main-default text_color_inactive'>
            Углеводы,г
          </p>
          <span className='text text_type_digits-default text_color_inactive'>
            {ingredient.carbohydrates}
          </span>
        </li>
      </ul>
    </section>
  );
}

IngredientDetails.propTypes = {
  ingredient: cardPropTypes.isRequired,
};
