import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const themes = {
  cosmic: {
    name: 'Cosmic Purple',
    mode: 'dark',
    primary: '#8b5cf6',
    secondary: '#ec4899',
    accent: '#06b6d4',
    background: 'from-purple-900 via-blue-900 to-indigo-900',
    cardBg: 'rgba(139, 92, 246, 0.15)',
    cardBorder: 'rgba(139, 92, 246, 0.3)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
  },
  ocean: {
    name: 'Ocean Blue',
    mode: 'dark',
    primary: '#06b6d4',
    secondary: '#3b82f6',
    accent: '#8b5cf6',
    background: 'from-cyan-900 via-blue-900 to-indigo-900',
    cardBg: 'rgba(6, 182, 212, 0.15)',
    cardBorder: 'rgba(6, 182, 212, 0.3)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
  },
  sunset: {
    name: 'Sunset Orange',
    mode: 'dark',
    primary: '#f97316',
    secondary: '#ec4899',
    accent: '#eab308',
    background: 'from-orange-900 via-red-900 to-pink-900',
    cardBg: 'rgba(249, 115, 22, 0.15)',
    cardBorder: 'rgba(249, 115, 22, 0.3)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
  },
  forest: {
    name: 'Forest Green',
    mode: 'dark',
    primary: '#10b981',
    secondary: '#22c55e',
    accent: '#14b8a6',
    background: 'from-green-900 via-emerald-900 to-teal-900',
    cardBg: 'rgba(16, 185, 129, 0.15)',
    cardBorder: 'rgba(16, 185, 129, 0.3)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
  },
  midnight: {
    name: 'Midnight Black',
    mode: 'dark',
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#a78bfa',
    background: 'from-slate-900 via-gray-900 to-zinc-900',
    cardBg: 'rgba(99, 102, 241, 0.15)',
    cardBorder: 'rgba(99, 102, 241, 0.3)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
  },
  ruby: {
    name: 'Ruby Red',
    mode: 'dark',
    primary: '#ef4444',
    secondary: '#f97316',
    accent: '#ec4899',
    background: 'from-red-900 via-rose-900 to-pink-900',
    cardBg: 'rgba(239, 68, 68, 0.15)',
    cardBorder: 'rgba(239, 68, 68, 0.3)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('cosmic');
  const [backgroundPattern, setBackgroundPattern] = useState('gradient');
  const [glassEffect, setGlassEffect] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('umangos_theme');
    const savedPattern = localStorage.getItem('umangos_bg_pattern');
    const savedGlass = localStorage.getItem('umangos_glass_effect');

    if (savedTheme) setCurrentTheme(savedTheme);
    if (savedPattern) setBackgroundPattern(savedPattern);
    if (savedGlass !== null) setGlassEffect(savedGlass === 'true');
  }, []);

  useEffect(() => {
    const theme = themes[currentTheme];
    const root = document.documentElement;

    root.style.setProperty('--theme-primary', theme.primary);
    root.style.setProperty('--theme-secondary', theme.secondary);
    root.style.setProperty('--theme-accent', theme.accent);

    const bodyBg = document.querySelector('body');
    if (bodyBg) {
      bodyBg.className = 'bg-gradient-to-br ' + theme.background + ' min-h-screen';
      
      if (backgroundPattern === 'dots') {
        bodyBg.style.backgroundImage = 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)';
        bodyBg.style.backgroundSize = '20px 20px';
      } else if (backgroundPattern === 'grid') {
        bodyBg.style.backgroundImage = 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)';
        bodyBg.style.backgroundSize = '30px 30px';
      } else {
        bodyBg.style.backgroundImage = '';
      }
    }
  }, [currentTheme, backgroundPattern]);

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
    localStorage.setItem('umangos_theme', themeName);
  };

  const changeBackgroundPattern = (pattern) => {
    setBackgroundPattern(pattern);
    localStorage.setItem('umangos_bg_pattern', pattern);
  };

  const toggleGlassEffect = () => {
    const newValue = !glassEffect;
    setGlassEffect(newValue);
    localStorage.setItem('umangos_glass_effect', newValue.toString());
  };

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    themes,
    changeTheme,
    backgroundPattern,
    changeBackgroundPattern,
    glassEffect,
    toggleGlassEffect,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};