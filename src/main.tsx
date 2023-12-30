import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import GlobalStylesProvider from '@/providers/GlobalStylesProvider.tsx';
import TanstackQueryProvider from '@/providers/TanstackQueryProvider.tsx';
import AppToastProvider from '@/providers/AppToastProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TanstackQueryProvider>
      <GlobalStylesProvider>
        <AppToastProvider>
          <App />
        </AppToastProvider>
      </GlobalStylesProvider>
    </TanstackQueryProvider>
  </React.StrictMode>,
);
