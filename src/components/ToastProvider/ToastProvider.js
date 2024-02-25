import React, { useCallback, useEffect, useState } from 'react';
import useEscapeKey from '../../hooks/useKeydown';

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

  const handleEscape = useCallback(() => {
    setToastStack([]);
  },[]);

  // Use Custom Hook
  useEscapeKey('Escape', handleEscape);


  return (
    <ToastContext.Provider
      value={{ toastStack, createToast, dismissToast }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
