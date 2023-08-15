import styles from '../main.module.css';
import {Link, useNavigate} from 'react-router-dom';
import {registerUserRequest} from '../../services/actions/requests';
import {useCallback, FormEvent} from 'react';
import {EmailInput, PasswordInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {useHandlerForm} from '../../hooks/HandlerForm';
import {useAppDispatch} from "../../utils/types";

export const RegistrationPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {values, handlerChange} = useHandlerForm({
    name: '',
    email: '',
    password: ''
  });

  const createAccount = useCallback((e: FormEvent) => {
      e.preventDefault();
      dispatch(registerUserRequest(values, () => navigate('/')));
    }, [values, dispatch]
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Регистрация</h1>
      <form className={styles.form} name="sign_up" onSubmit={createAccount}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handlerChange}
          value={values.name}
          name={'name'}
          size={'default'}
          extraClass="mt-6 mb-6"
        />
        <EmailInput
          onChange={handlerChange}
          value={values.email}
          name={'email'}
          placeholder="E-mail"
          isIcon={false}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={handlerChange}
          value={values.password}
          name={'password'}
          extraClass="mb-6"
        />
        <div className={styles.submit_button}>
          <Button
            type="primary"
            size="medium"
            htmlType='submit'>
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <div className={`${styles.actions} mt-20`}>
        <p className={styles.text}>Уже зарегистрированы?</p>
        <Link to='/login' className={styles.text_button}>&#8194;Войти</Link>
      </div>
    </div>
  )
}
