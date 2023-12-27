import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import GlobalStylesProvider from '@/providers/GlobalStylesProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStylesProvider>
      <App />
    </GlobalStylesProvider>
  </React.StrictMode>,
);
