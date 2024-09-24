import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Toast {
  id: number;
  message: string;
}

interface ToastContextType {
  addToast: (message: string) => void;
  toasts: Toast[];
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  let nextId = 0;

  const addToast = (message: string) => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000); // Toast duration
  };

  return (
    <ToastContext.Provider value={{ addToast, toasts }}>
      {children}
      <div className="fixed bottom-0 right-0 p-4">
        {toasts.map((toast) => (
          <div key={toast.id} className="bg-gray-800 text-white p-2 rounded mb-2">
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
