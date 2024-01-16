import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App.tsx';
import './index.css';
import GlobalStylesProvider from '@/providers/GlobalStylesProvider.tsx';
import TanstackQueryProvider from '@/providers/TanstackQueryProvider.tsx';
import AppToastProvider from '@/providers/AppToastProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId='1071323469419-92mh3o41c9h7s44nqvhqdrj3b8t1665k.apps.googleusercontent.com'>
    <React.StrictMode>
      <TanstackQueryProvider>
        <GlobalStylesProvider>
          <AppToastProvider>
            <App />
          </AppToastProvider>
        </GlobalStylesProvider>
      </TanstackQueryProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>,
);
