import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { theme } from "./helpers/mui/theme"
import { ThemeProvider } from '@mui/material/styles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
