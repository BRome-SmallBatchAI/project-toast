import React, { useState } from 'react';
import Button from '../Button';
import styles from './ToastPlayground.module.css';
import ToastShelf from '../ToastShelf/ToastShelf';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {

  const [toastStack, setToastStack] = useState([]);
  const [variant, setVariant] = useState(VARIANT_OPTIONS[0]);
  const [message, setMessage] = useState('');

  function handleCreateToast (event) {
    event.preventDefault();

    setToastStack((prevToastStack) => [
      ...prevToastStack,
      { id: crypto.randomUUID(), variant: variant, message: message }
    ]);

    setVariant(VARIANT_OPTIONS[0]);
    setMessage('');
  }

  function handleDismiss (id) {
    setToastStack((prevToastStack) => (
      prevToastStack.filter(toast =>  toast.id !== id)
    ));
  }

  return (
    <form
      className={styles.wrapper}
      onSubmit={handleCreateToast}
    >
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf
        toastStack={toastStack}
        handleDismiss={handleDismiss}
      />

      <div className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={event => setMessage(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANT_OPTIONS.map((variantOption) => (
              <label htmlFor={`variant-${variantOption}`} key={`variant-${variantOption}`}>
                <input
                  type='radio'
                  id={`variant-${variantOption}`}
                  name='variant'
                  value={variantOption}
                  checked={variant === variantOption}
                  onChange={(event) => setVariant(event.target.value)}
                />
                {variantOption}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button type='submit' onClick={event => event.stopPropagation()}>Pop Toast!</Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ToastPlayground;
