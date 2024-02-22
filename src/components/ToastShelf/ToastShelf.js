import React from 'react';
import Toast from '../Toast';
import styles from './ToastShelf.module.css';

function ToastShelf({ toastStack, handleDismiss }) {


  return (
    <ol className={styles.wrapper}>

      {toastStack.map((toast) => (
        <li className={styles.toastWrapper} key={toast.id}>
          <Toast
            id={toast.id}
            variant={toast.variant}
            message={toast.message}
            onDismiss={handleDismiss}
          />
        </li>
      ))}

    </ol>
  );
}

export default ToastShelf;
