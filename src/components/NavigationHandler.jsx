'use client';
import { useEffect } from 'react';
import { useLoading } from '@/context/LoadingContext';

export default function NavigationHandler() {
  const { stopLoading } = useLoading();

  useEffect(() => {
    const timeout = setTimeout(() => {
      stopLoading();
    }, 1000);

    const handleLoad = () => {
      clearTimeout(timeout);
      stopLoading();
    };

    const handleDOMReady = () => {
      clearTimeout(timeout);
      stopLoading();
    };

    window.addEventListener('load', handleLoad);
    document.addEventListener('DOMContentLoaded', handleDOMReady);
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('load', handleLoad);
      document.removeEventListener('DOMContentLoaded', handleDOMReady);
    };
  }, [stopLoading]);

  return null;
}