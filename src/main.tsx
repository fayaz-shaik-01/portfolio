import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

const isProd = import.meta.env.MODE === 'production';
const base = isProd ? '/portfolio' : '/'; // 👈 dynamic base

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <HashRouter basename={base}>
        <App />
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
);
