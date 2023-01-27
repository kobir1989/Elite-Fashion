import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { theme } from "./helpers/mui/theme"
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from "redux-persist/integration/react";
import store from './redux/store/store';
import { Provider } from "react-redux";
import { Toaster } from 'react-hot-toast';
import { persistStore } from "redux-persist";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Toaster position="top-right" toastOptions={{ duration: 5000, }} />
          <PersistGate loading={null} persistor={persistStore(store)}>
            <App />
          </PersistGate>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
