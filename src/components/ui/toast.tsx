import React from 'react';
import { useToastStore } from '@/store/toast/toastStore';

const Toast: React.FC = () => {
  const { message, isVisible } = useToastStore();

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#333',
        color: '#fff',
        padding: '15px 30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        fontSize: '16px',
        fontWeight: 'bold',
        zIndex: 1000,
        animation: 'fadeInOut 2s ease-in-out',
      }}
    >
      {message}
    </div>
  );
};

export default Toast;
