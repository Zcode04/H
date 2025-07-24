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
      ? 'bg-gradient-to-r from-green-500 to-green-500 hover:from-emerald-500/30 hover:to-green-400/30 text-white border-green-50/50 hover:border-green-400/40'
      : 'bg-gradient-to-r from-green-500 to-emerald-700 hover:from-green-300 hover:to-green-500 text-gray-100 border-green-500 hover:border-green-300';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className={`h-10 w-10 transition-all duration-300 backdrop-blur-sm z-50 border rounded-full shadow-lg hover:shadow-xl hover:scale-105 ${classes}`}
      aria-label="تبديل الشريط الجانبي"
    >
      <ChevronLeft className="h-5 w-5 dark:text-green-50 z-50" />
    </Button>
  );
}