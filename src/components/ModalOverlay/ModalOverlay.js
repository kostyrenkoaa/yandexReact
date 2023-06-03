import React from 'react';
import PropTypes from 'prop-types';
import styles from './ModalOverlay.module.css';

export default function ModalOverlay({onClick}) {
  return <div className={styles.modalOverlay} onClick={onClick}></div>;
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func,
};
