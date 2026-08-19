/* =========================
   main.tsx
========================= */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/variables.css';
import './styles/globals.css';
import './styles/responsive.css';

import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);