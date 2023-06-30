import styles from './IngredientDetails.module.css';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function IngredientDetails() {
  const {id} = useParams();
  const ingredients = useSelector(state => state.ingredients.ingredients)
  if (!ingredients?.length) {
    return null;
  }
  const currentIngredient = ingredients.find((ingredient) => ingredient._id === id)

  return (
    <section className={` ${styles.section} pt-10 pb-15 pl-10 pr-10`}>
      <h2 className={styles.tac}>Детали ингредиента</h2>
      <div className={styles.tac}>
        <img className='pb-4 pt-10' src={currentIngredient.image_large}/>
      </div>
      <p className={` ${styles.tac} text text_type_main-medium pb-8`}>
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
