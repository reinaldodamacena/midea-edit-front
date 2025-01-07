// src/pages/SettingsPage.jsx
import React, { useState } from 'react';
import SettingsTemplate from '../components/templates/SettingsTemplate/SettingsTemplate';

const SettingsPage = () => {
  const [settings, setSettings] = useState([
    { name: 'darkMode', label: 'Modo Escuro', value: false, icon: '🌙' },
  ]);

  const handleToggleSetting = (name) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.name === name ? { ...setting, value: !setting.value } : setting
      )
    );
  };

  return <SettingsTemplate settings={settings} onToggleSetting={handleToggleSetting} />;
};

export default SettingsPage;
