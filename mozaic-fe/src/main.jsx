import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { initRipple } from './utils/ripple';

// Inisialisasi efek ripple interaktif di seluruh aplikasi
initRipple();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
