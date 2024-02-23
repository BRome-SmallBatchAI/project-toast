import React, { useState } from 'react';

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

  return (
    <ToastContext.Provider
      value={{ toastStack, createToast, dismissToast }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
