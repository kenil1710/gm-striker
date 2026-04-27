import React, { useState, useEffect } from 'react';

const Toast = ({ message, duration = 3000, onClose }) => {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setHiding(true);
    }, duration - 400);

    const closeTimer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(closeTimer);
    };
  }, [duration, onClose]);

  return (
    <div className={`toast ${hiding ? 'hiding' : ''}`}>
      <span className="toast-icon">🔄</span>
      {message}
    </div>
  );
};

export default Toast;
