import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Palette, Sun, Moon, Grid3x3, Droplet, Sparkles, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeCustomizer = () => {
  const { currentTheme, themes, changeTheme, backgroundPattern, changeBackgroundPattern, glassEffect, toggleGlassEffect } = useTheme();

  const themeCards = Object.entries(themes).map(([key, theme]) => ({ key, ...theme }));
  const darkThemes = themeCards.filter(t => t.mode === 'dark');

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <div className="bg-purple-500/20 p-4 rounded-2xl border-2 border-purple-400/30">
          <Palette className="w-10 h-10 text-purple-400" />
        </div>
        <div>
          <h2 className="text-4xl font-bold text-white text-shadow-lg mb-1">Theme Customizer</h2>
          <p className="text-white/80 text-lg font-medium text-shadow-sm">Personalize your experience</p>
        </div>
      </div>

      <div className="card-readable border-2 border-purple-400/30">
        <div className="flex items-center space-x-3 mb-6">
          <Moon className="w-6 h-6 text-purple-400" />
          <h3 className="text-2xl font-bold text-white text-shadow-lg">Available Themes</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {darkThemes.map((theme) => (
            <motion.button
              key={theme.key}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => changeTheme(theme.key)}
              className={'relative p-6 rounded-2xl border-2 transition-all ' + (currentTheme === theme.key ? 'border-white/50 shadow-2xl shadow-purple-500/50' : 'border-white/20 hover:border-white/40')}
              style={{ background: 'linear-gradient(135deg, ' + theme.primary + '20, ' + theme.secondary + '20)' }}
            >
              {currentTheme === theme.key && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 bg-green-500 rounded-full p-2">
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}
              
              <div className="space-y-4">
                <div className="flex justify-between items-center space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white/30" style={{ backgroundColor: theme.primary }} />
                  <div className="w-8 h-8 rounded-full border-2 border-white/30" style={{ backgroundColor: theme.secondary }} />
                  <div className="w-8 h-8 rounded-full border-2 border-white/30" style={{ backgroundColor: theme.accent }} />
                </div>
                <h4 className="text-white font-bold text-lg text-shadow-md">{theme.name}</h4>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="card-readable border-2 border-blue-400/30">
        <div className="flex items-center space-x-3 mb-6">
          <Grid3x3 className="w-6 h-6 text-blue-400" />
          <h3 className="text-2xl font-bold text-white text-shadow-lg">Background Pattern</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['gradient', 'dots', 'grid'].map((pattern) => (
            <motion.button
              key={pattern}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => changeBackgroundPattern(pattern)}
              className={'p-6 rounded-2xl border-2 transition-all bg-white/10 backdrop-blur-xl ' + (backgroundPattern === pattern ? 'border-white/50 shadow-xl' : 'border-white/20 hover:border-white/40')}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">
                  {pattern === 'gradient' && '🌈'}
                  {pattern === 'dots' && '⚪'}
                  {pattern === 'grid' && '⬜'}
                </div>
                <h4 className="text-white font-bold text-lg capitalize">{pattern}</h4>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="card-readable border-2 border-green-400/30">
        <div className="flex items-center space-x-3 mb-6">
          <Sparkles className="w-6 h-6 text-green-400" />
          <h3 className="text-2xl font-bold text-white text-shadow-lg">Theme Preview</h3>
        </div>
        <div className="p-6 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20">
          <h4 className="text-white font-bold text-2xl mb-2">Sample Card</h4>
          <p className="text-white/80 text-lg mb-4">This is how your content will look with the selected theme.</p>
          <div className="flex space-x-3">
            <button className="px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-transform hover:scale-105" style={{ backgroundColor: 'var(--theme-primary)' }}>
              Primary Button
            </button>
            <button className="px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-transform hover:scale-105" style={{ backgroundColor: 'var(--theme-secondary)' }}>
              Secondary Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizer;