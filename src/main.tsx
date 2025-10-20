import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

const isProd = import.meta.env.MODE === 'production';
const base = isProd ? '/portfolio' : '/'; // 👈 dynamic base
// use Vite's BASE_URL (falls back to "/"); remove trailing slash
const basePath = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter basename={basePath}>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
