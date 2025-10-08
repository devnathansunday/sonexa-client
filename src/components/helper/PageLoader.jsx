'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const PageLoader = () => {
  const pathName = usePathname();
  const [width, setWidth] = useState('0%');
  const [visible, setVisible] = useState(false);
  const [prevPath, setPrevPath] = useState(null);

  useEffect(() => {
    if (prevPath !== null && prevPath !== pathName) {
      setVisible(true);
      setWidth('0%');

      const step2 = setTimeout(() => {
        setWidth('100%');
      }, 10);

      const hide = setTimeout(() => {
          setVisible(false);
          setWidth('0%');
      }, 700);

      return () => {
        clearTimeout(step2);
        clearTimeout(hide);
      };
    }

    setPrevPath(pathName);
  }, [pathName]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 h-[3px] bg-my-pink z-[5000] transition-all duration-300 ease-in-out"
      style={{ width }}
    />
  );
};

export default PageLoader;
