import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CredentialContextProvider from './component/contexts/CredentialContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CredentialContextProvider>
      <App />
    </CredentialContextProvider>
  </React.StrictMode>
);
