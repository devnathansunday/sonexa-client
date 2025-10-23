'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useLoading } from '@/context/LoadingContext';

export default function NavigationHandler() {
  const { stopLoading } = useLoading();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => {
        stopLoading();
    }, 2000);

    return () => clearTimeout(timer);
  }, [pathname, searchParams, stopLoading]);

  return null;
}