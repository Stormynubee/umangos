import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import ThemeCustomizer from '../../components/ThemeCustomizer';

const SettingsPage = () => {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center space-x-4">
          <div className="bg-indigo-500/20 p-4 rounded-2xl border-2 border-indigo-400/30">
            <SettingsIcon className="w-10 h-10 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white text-shadow-lg mb-1">Settings</h1>
            <p className="text-white/80 text-lg font-medium text-shadow-sm">Customize your UmangOS experience</p>
          </div>
        </div>

        <ThemeCustomizer />
      </div>
    </div>
  );
};

export default SettingsPage;