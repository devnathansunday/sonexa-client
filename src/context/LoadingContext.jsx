'use client';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [width, setWidth] = useState('0%');
  const [visible, setVisible] = useState(false);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setVisible(true);
    setWidth('10px');
  }, []);

  const almostDone = useCallback(() => {
    setWidth('80%');
  }, [])

  const stopLoading = useCallback(() => {
    setIsLoading(false);
    setWidth('100%');
  }, []);
  
  useEffect(() => {
    if (width === '100%') {
      setTimeout(() => {
        setVisible(false);
      }, 2000);
    }
  }, [width]);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, almostDone, stopLoading }}>
      {children}
      
      {visible && (
        <div
          className="fixed top-0 left-0 h-[3px] bg-my-pink z-[5000] transition-all duration-500 ease-in-out"
          style={{ width }}
        />
      )}
    </LoadingContext.Provider>
  );
}