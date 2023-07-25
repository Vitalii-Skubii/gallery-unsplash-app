import React from 'react';
import spinner from '../../assets/icons/spinner.svg';
import styles from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <img src={spinner} alt="spinner"/>
    </div>
  );
};
