/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import React, { useState } from 'react';
import NewYearButton from './NewYearButton';
import NotificationButton from './NotificationButton';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import UserArea from './UserArea';
import { Button } from '@douyinfe/semi-ui';
import { Palette } from 'lucide-react';

const ActionButtons = ({
  isNewYear,
  unreadCount,
  onNoticeOpen,
  theme,
  onThemeToggle,
  currentLang,
  onLanguageChange,
  userState,
  isLoading,
  isMobile,
  isSelfUseMode,
  logout,
  navigate,
  t,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  
  const colorOptions = [
    { name: 'Blue', value: 'from-blue-500 to-purple-600', bg: 'bg-gradient-to-r from-blue-500 to-purple-600' },
    { name: 'Purple', value: 'from-purple-500 to-pink-500', bg: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { name: 'Green', value: 'from-green-500 to-teal-500', bg: 'bg-gradient-to-r from-green-500 to-teal-500' },
    { name: 'Orange', value: 'from-orange-500 to-red-500', bg: 'bg-gradient-to-r from-orange-500 to-red-500' },
    { name: 'Cyan', value: 'from-cyan-500 to-blue-500', bg: 'bg-gradient-to-r from-cyan-500 to-blue-500' },
  ];

  const handleColorChange = (colorValue) => {
    document.documentElement.style.setProperty('--primary-gradient', colorValue);
    // Save to localStorage
    localStorage.setItem('primaryGradient', colorValue);
  };

  React.useEffect(() => {
    const savedGradient = localStorage.getItem('primaryGradient');
    if (savedGradient) {
      document.documentElement.style.setProperty('--primary-gradient', savedGradient);
    }
  }, []);

  return (
    <div className='flex items-center gap-2 md:gap-3 relative'>
      <NewYearButton isNewYear={isNewYear} />

      <NotificationButton
        unreadCount={unreadCount}
        onNoticeOpen={onNoticeOpen}
        t={t}
      />

      <ThemeToggle theme={theme} onThemeToggle={onThemeToggle} t={t} />

      {/* Color Changing Button */}
      <div className="relative">
        <Button
          theme="light"
          type="tertiary"
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="p-2 border border-white/20 text-white hover:bg-white/10 backdrop-blur-xl glass-apple"
        >
          <Palette className="h-4 w-4" />
        </Button>
        
        {showColorPicker && (
          <div className="absolute top-full right-0 mt-2 p-3 bg-white/15 backdrop-blur-xl border border-white/20 rounded-lg glass-apple z-50 min-w-[140px] shadow-lg">
            <div className="grid grid-cols-2 gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.name}
                  onClick={() => {
                    handleColorChange(color.value);
                    setShowColorPicker(false);
                  }}
                  className={`w-8 h-8 rounded-lg ${color.bg} hover:scale-110 transition-transform`}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <LanguageSelector
        currentLang={currentLang}
        onLanguageChange={onLanguageChange}
        t={t}
      />

      <UserArea
        userState={userState}
        isLoading={isLoading}
        isMobile={isMobile}
        isSelfUseMode={isSelfUseMode}
        logout={logout}
        navigate={navigate}
        t={t}
      />
    </div>
  );
};

export default ActionButtons;
