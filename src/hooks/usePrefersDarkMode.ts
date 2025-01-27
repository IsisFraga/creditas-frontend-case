import { useEffect, useState } from 'react';

export const usePrefersDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => 
    typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-color-scheme: dark)').matches 
      : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isDarkMode;
};