import React, { useEffect, useState } from 'react';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {

  const [toastStack, setToastStack] = useState([]);

  function createToast (variant, message) {
    setToastStack((prevToastStack) => [
      ...prevToastStack,
      { id: crypto.randomUUID(), variant: variant, message: message }
    ]);
  }

  function dismissToast (id) {
    setToastStack((prevToastStack) => (
      prevToastStack.filter(toast =>  toast.id !== id)
    ));
  }

  useEffect(() => { // clear all toasts on Escape Key pressed
    function handleEscKeyDown(event) {
      if (event.code === 'Escape') {
        setToastStack([]);
      }
    }

    window.addEventListener('keydown', handleEscKeyDown);

    return () => {
      window.removeEventListener('keydown', handleEscKeyDown);
    };
  },[]);

  return (
    <ToastContext.Provider
      value={{ toastStack, createToast, dismissToast }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
