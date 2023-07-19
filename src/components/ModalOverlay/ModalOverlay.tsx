import React from 'react';
// @ts-ignore
import styles from './ModalOverlay.module.css';

export default function ModalOverlay({onClick}: {onClick: ()=> void}) {
  return <div className={styles.modalOverlay} onClick={onClick}></div>;
}
