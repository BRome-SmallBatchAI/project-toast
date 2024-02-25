import React, { useEffect } from "react";

function useKeydown(key, callback) {

  useEffect(() => {
    function handleEscKeyDown(event) {
      if (event.code === key) {
        callback(event);
      }
    }

    window.addEventListener('keydown', handleEscKeyDown);

    return () => {
      window.removeEventListener('keydown', handleEscKeyDown);
    };
  },[callback]);

}

export default useEscapeKey;
