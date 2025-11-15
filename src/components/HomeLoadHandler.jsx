'use client';
import { useEffect } from 'react';
import { useLoading } from '@/context/LoadingContext';

export default function HomeLoadHandler() {
    const { stopLoading } = useLoading();
  
    useEffect(() => {
        console.log('home, stopping...')
        stopLoading();
    }, []);

    return null;
}