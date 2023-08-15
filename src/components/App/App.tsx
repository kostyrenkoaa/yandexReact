import React, {useEffect} from 'react';
import AppHeader from '../AppHeader/AppHeader';
import {getIngredients} from '../../services/actions/ingredients';
import {checkAuth} from '../../services/actions/requests';
import styles from './App.module.css';
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
import {ModalE} from "../../services/actions/currentIngredient";
import {useAppDispatch} from "../../utils/types";
import {FeedPage} from "../../pages/Feed";
import Orders from "../../pages/Orders";
import OrdersInfo from "../OrdersInfo/OrdersInfo";

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
  const dispatch = useAppDispatch();
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
      type: ModalE.CLOSE
    })
    navigate(-1);
  };

  return (
    <>
      <AppHeader/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>

        <Route path="/login" element={
          <ProtectedRouteElement forAuth={false} children={<LoginPage/>}/>
        }/>

        <Route path="/profile" element={
          <ProtectedRouteElement forAuth={true} children={<ProfilePage/>}/>
        }/>

        <Route path="/profile/orders" element={
          <ProtectedRouteElement forAuth={true} children={<Orders/>}/>
        }/>

        <Route path="/register" element={
          <ProtectedRouteElement forAuth={false} children={<RegistrationPage/>}/>
        }/>

        <Route path="/reset-password" element={
          <ProtectedRouteElement forAuth={false} children={<ResetPasswordPage/>}/>
        }/>

        <Route path="/forgot-password" element={
          <ProtectedRouteElement forAuth={false} children={<ForgotPasswordPage/>}/>
        }/>

        <Route path="/feed" element={
          <FeedPage/>
        }/>

        {!background &&
          (
            <>
              <Route path="/ingredients/:id" element={
                <IngredientDetails/>
              }/>

              <Route path="/feed/:id" element={
                <OrdersInfo/>
              }/>

              <Route path="/profile/orders/:id" element={
                <ProtectedRouteElement forAuth={true} children={<OrdersInfo/>}/>
              }/>
            </>

          )
        }

        {background &&
          (
            <>
              <Route path="/ingredients/:id" element={
                <>
                  <HomePage/>
                  <Modal onRequestClose={closeIngredientModal} title=''>
                    <IngredientDetails/>
                  </Modal>
                </>
              }/>

              <Route path="/feed/:id" element={
                <>
                  <FeedPage/>
                  <Modal onRequestClose={closeIngredientModal} title=''>
                    <OrdersInfo/>
                  </Modal>
                </>
              }/>

              <Route path="/profile/orders/:id" element={
                <>
                  <ProtectedRouteElement forAuth={true} children={
                    <>
                      <Orders/>
                      <Modal onRequestClose={closeIngredientModal} title=''>
                        <OrdersInfo/>
                      </Modal>
                    </>
                  }/>

                </>
              }/>

            </>
          )
        }

      </Routes>
    </>
  )
}
