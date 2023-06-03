import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Modal.module.css';

export default function Modal({children, onRequestClose, title}) {
  useEffect(() => {
    const keyDown = (evt) => {
      if (evt.key === 'Escape') onRequestClose();
    };
    document.addEventListener('keydown', keyDown);
    return () => {
      document.removeEventListener('keydown', keyDown);
    };
  }, [onRequestClose]);

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <h2 className={`${styles.title} text text_type_main-large pb-5`}>
          {title}
        </h2>
        <button className={styles.close} type='button'>
          <CloseIcon type='primary' onClick={onRequestClose}/>
        </button>
        {children}
      </div>
      <ModalOverlay onClick={onRequestClose}/>
    </>,
    document.querySelector('#modal')
  );
}

Modal.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
};
