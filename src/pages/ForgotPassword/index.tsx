import styles from '../main.module.css';
import {resetPasswordRequest} from '../../services/actions/requests';
import {useCallback, FormEvent} from 'react';
import {EmailInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, useNavigate} from 'react-router-dom';
import {useHandlerForm} from '../../hooks/HandlerForm';
import {useAppDispatch} from "../../utils/types";

export const ForgotPasswordPage = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {values, handlerChange} = useHandlerForm({email: ''});


  const forgotPassword = useCallback((e: FormEvent) => {
      e.preventDefault();
      dispatch(resetPasswordRequest(values, () => navigate('/reset-password')));
    }, [values, dispatch]
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Восстановление пароля</h1>
      <form className={styles.form} onSubmit={forgotPassword} name="restore_password">
        <EmailInput
          onChange={handlerChange}
          value={values.email}
          name={'email'}
          placeholder="Укажите e-mail"
          isIcon={false}
          extraClass="mb-6 mt-6"
          required>
        </EmailInput>
        <div className={styles.submit_button}>
          <Button
            type="primary"
            size="medium"
            htmlType='submit'>Восстановить
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
