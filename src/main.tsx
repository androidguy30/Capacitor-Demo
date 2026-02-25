import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './ui/App';
import './ui/styles.css';
import { initNativeBackButtonHandling } from '@core/platform';

const rootEl = document.getElementById('root');

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);

  initNativeBackButtonHandling(() => {
    // Fallback: close the app when there is no navigation stack to pop.
    // The native layer decides final behavior.
    App.exitApp?.();
  });

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
}

