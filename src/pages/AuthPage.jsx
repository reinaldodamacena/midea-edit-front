// src/pages/AuthPage.jsx
import React from 'react';
import AuthTemplate from '../components/templates/AuthTemplate/AuthTemplate';

const AuthPage = () => {
  const handleLogin = () => {
    console.log('Login efetuado!');
  };

  return <AuthTemplate title="Entrar no Sistema" onSubmit={handleLogin} />;
};

export default AuthPage;
