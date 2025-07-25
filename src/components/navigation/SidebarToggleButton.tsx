// components/sidebar/SidebarToggleButton.tsx
'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

interface SidebarToggleButtonProps {
  toggleSidebar: () => void;
}

export function SidebarToggleButton({ toggleSidebar }: SidebarToggleButtonProps) {
  const { theme } = useTheme();

  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    setCurrentTheme(theme === 'dark' ? 'dark' : 'light');
  }, [theme]);

  const classes =
    currentTheme === 'dark'
      ? 'h-6 w-12 rounded-full  border-green-400 bg-gradient-to-b from-green-600 to-green-700 dark:from-gray-900 dark:to-gray-950 dark:text-green-400 dark:border-green-400/40 hover:bg-blue-100 dark:hover:bg-blue-900/3 transition-colors duration-200 shadow-sm'
      : 'h-6 w-12 rounded-full  border-green-400 bg-gradient-to-b from-green-600 to-green-700 dark:from-gray-900 dark:to-gray-950 dark:text-green-400 dark:border-green-400/40 hover:bg-blue-100 dark:hover:bg-blue-900/3 transition-colors duration-200 shadow-sm';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className={`h-6 w-12  backdrop-blur-sm z-50 border rounded-full shadow-lg hover:shadow-xl hover:scale-105 ${classes}`}
      aria-label="تبديل الشريط الجانبي"
    >
      <ChevronLeft className="h-5 w-5 text-green-200 hover:rotate-180 transition-transform duration-400 z-50" />
    </Button>
  );
}
