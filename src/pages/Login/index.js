import {useDispatch} from 'react-redux';
import styles from '../main.module.css';
import {Button, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';
import {useCallback} from 'react';
import {logInRequest} from '../../services/actions/requests';
import {useHandlerForm} from '../../hooks/HandlerForm';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const {values, handlerChange} = useHandlerForm({email: '', password: ''});
  const logIn = useCallback((e) => {
      e.preventDefault();
      dispatch(logInRequest(values));
    }, [values, dispatch]
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Вход</h1>
      <form className={styles.form} onSubmit={logIn} name="sign_in">
        <EmailInput
          onChange={handlerChange}
          value={values.email}
          name={'email'}
          placeholder={'E-mail'}
          extraClass="mb-6 mt-6">
        </EmailInput>
        <PasswordInput
          onChange={handlerChange}
          value={values.password}
          name={'password'}
          placeholder={'Пароль'}
          extraClass="mb-6">
        </PasswordInput>
        <div className={styles.submit_button}>
          <Button
            type="primary"
            size="medium"
            htmlType='submit'>Войти
          </Button>
        </div>
      </form>
      <div className={`${styles.actions} mt-20`}>
        <p className={styles.text}>Вы - новый пользователь?</p>
        <Link to='/register' className={styles.text_button}>&#8194;Зарегистрироваться</Link>
      </div>
      <div className={`${styles.actions} mt-4`}>
        <p className={styles.text}>Забыли пароль?</p>
        <Link to='/forgot-password' className={styles.text_button}>&#8194;Восстановить пароль</Link>
      </div>
    </div>
  )
};
