import {useCallback, useState, ChangeEvent, FormEvent} from 'react';
// @ts-ignore
import styles from './styles.module.css';
import {EmailInput, Input, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector, useDispatch} from 'react-redux';
import {logOutRequest} from '../../services/actions/requests';
import {NavLink} from 'react-router-dom';
import {getCookie} from '../../utils/cookie';
import {saveUserData} from '../../services/actions/requests';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  // @ts-ignore
    const userInfo = useSelector(state => state.requests.userInfo);
  let userEmail = userInfo?.email ?? ''
  let userName = userInfo?.name ?? ''

  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [password, setPassword] = useState('');

  const handlerResetData = (e: FormEvent) => {
    e.preventDefault();
    setName(userName)
    setEmail(userEmail)
  }

  const logOut = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    // @ts-ignore
      dispatch(logOutRequest(refreshToken))
  }

  const onChangeName = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setName(value);
  };

  const onChangeEmail = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setEmail(value);
  };

  const onChangePassword = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setPassword(value);
  };

  const accessToken = getCookie('accessToken')

  const saveNewData = useCallback((e: FormEvent) => {
      e.preventDefault();
      // @ts-ignore
      dispatch(saveUserData(accessToken, name, email, password));
    }, [accessToken, name, email, password, dispatch]
  );

  const classNameForNav = useCallback((infoMenuitem: { isActive: any; }) => {
      return !infoMenuitem.isActive ? styles.button : `${styles.link_active} ${styles.button}`
    }, []
  );

  return (
    <div className={styles.container}>
      <nav className={styles.description}>
        <NavLink to='/profile' className={classNameForNav}>
          Профиль
        </NavLink>
        <NavLink to='/orders' className={classNameForNav}>
          История заказов
        </NavLink>
        <NavLink to='/login' onClick={logOut} className={styles.button}>
          Выход
        </NavLink>
        <p className={`${styles.info} mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
      </nav>

      <form className={styles.profile_info} onSubmit={saveNewData} name="profile">
        <Input
          onChange={onChangeName}
          value={name}
          name={'name'}
          placeholder="Имя"
          icon={"EditIcon"}
          extraClass="mb-6"
          size={"default"}
        />
        <EmailInput
          onChange={onChangeEmail}
          value={email}
          name={'email'}
          placeholder="Логин"
          extraClass="mb-6"
          size={"default"}
        />
        <PasswordInput
          onChange={onChangePassword}
          value={password}
          name={'password'}
          placeholder="Пароль"
          icon={"EditIcon"}
          extraClass="mb-6"
          size={"default"}
        />
        <div className={styles.buttons}>
          <button className={styles.buttonCancel} onClick={handlerResetData}>
            Отмена
          </button>
          <Button
            type="primary"
            size="medium"
            htmlType='submit'>
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  )
};
