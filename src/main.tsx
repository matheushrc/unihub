
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import UnihubApp from './UnihubApp';
import './index.css';

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(
    <React.StrictMode>
      <UnihubApp />
    </React.StrictMode>
  );
}
