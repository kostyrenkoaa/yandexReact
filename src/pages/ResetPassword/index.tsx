import styles from '../main.module.css';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {settingNewPasswordRequest} from '../../services/actions/requests';
import {useCallback, FormEvent} from 'react';
import {Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, useNavigate} from 'react-router-dom';
import {useHandlerForm} from '../../hooks/HandlerForm';
import {useAppDispatch} from "../../utils/types";

export const ResetPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {values, handlerChange} = useHandlerForm({password: '', token: ''});
  const settingNewPassword = useCallback((e: FormEvent) => {
      e.preventDefault();
      dispatch(settingNewPasswordRequest(values, () => navigate('/login')));
    }, [values, dispatch]
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Восстановление пароля</h1>
      <form className={styles.form} onSubmit={settingNewPassword}
            name="password_reset">
        <PasswordInput
          onChange={handlerChange}
          value={values.password}
          placeholder="Введите новый пароль"
          name={'password'}
          extraClass="mb-6 mt-6"
        />
        <Input
          onChange={handlerChange}
          value={values.token}
          placeholder="Введите код из письма"
          name={'token'}
          extraClass="mb-6"
        />
        <div className={styles.submit_button}>
          <Button
            type="primary"
            size="medium"
            htmlType='submit'>Сохранить
          </Button>
        </div>
      </form>
      <div className={`${styles.actions} mt-20`}>
        <p className={styles.text}>Вспомнили пароль?</p>
        <Link to='/login' className={styles.text_button}>&#8194;Войти</Link>
      </div>
    </div>
  )
}
