import React, {useEffect, ReactNode} from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal');

type ModalProps = {
  children: ReactNode,
  onRequestClose: () => void,
  title: string,
};

export default function Modal({children, onRequestClose, title}: ModalProps) {
  useEffect(() => {
    const keyDown = (evt: KeyboardEvent) => {
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
        <button className={styles.close} type='button' data-cypress="button-close">
          <CloseIcon type='primary' onClick={onRequestClose}/>
        </button>
        {children}
      </div>
      <ModalOverlay onClick={onRequestClose}/>
    </>,
    modalRoot!
  );
}
