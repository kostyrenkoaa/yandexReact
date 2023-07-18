import React, {useEffect} from 'react';
import AppHeader from '../AppHeader/AppHeader';
import {getIngredients} from '../../services/actions/ingredients';
import {checkAuth} from '../../services/actions/requests';
import styles from './App.module.css';
import {useDispatch} from 'react-redux';
import {Routes, Route, BrowserRouter, useLocation, useNavigate} from 'react-router-dom';
import {HomePage} from '../../pages/Home'
import {LoginPage} from '../../pages/Login'
import {ProfilePage} from "../../pages/Profile";
import {RegistrationPage} from "../../pages/Registration";
import {ResetPasswordPage} from "../../pages/ResetPassword";
import {ForgotPasswordPage} from "../../pages/ForgotPassword";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from '../Modal/Modal';
import {ProtectedRouteElement} from "../ProtectedRouteElement"
import {CLOSE_MODAL} from "../../services/actions/currentIngredient";

export default function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Root/>
      </BrowserRouter>
    </div>
  );
}

function Root() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const background = location.state?.background ?? false

  useEffect(() => {
      dispatch(getIngredients());
      dispatch(checkAuth());
    },
    [dispatch]
  );

  const closeIngredientModal = () => {
    dispatch({
      type: CLOSE_MODAL
    })
    navigate(-1);
  };

  return (
    <>
      <AppHeader/>
      <Routes>
        <Route path="/" element={
          <HomePage/>
        }/>

        <Route path="/login" element={
          <ProtectedRouteElement children={<LoginPage/>}/>
        }/>

        <Route path="/profile" element={
          <ProtectedRouteElement forAuth children={<ProfilePage/>}/>
        }/>

        <Route path="/register" element={
          <ProtectedRouteElement children={<RegistrationPage/>}/>
        }/>

        <Route path="/reset-password" element={
          <ProtectedRouteElement children={<ResetPasswordPage/>}/>
        }/>

        <Route path="/forgot-password" element={
          <ProtectedRouteElement children={<ForgotPasswordPage/>}/>
        }/>

        {!background &&
          (
            <Route path="/ingredients/:id" element={
              <IngredientDetails/>
            }/>
          )
        }

        { background &&
          (
            <Route path="/ingredients/:id" element={
              <Modal
                onRequestClose={closeIngredientModal}
              >
                <IngredientDetails />
              </Modal>
            }/>
          )
        }

      </Routes>
    </>
  )
}
