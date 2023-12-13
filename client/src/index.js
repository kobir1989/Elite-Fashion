import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { theme } from './helpers/mui/theme'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import store from './redux/store/store'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { persistStore } from 'redux-persist'
import { Analytics } from '@vercel/analytics/react'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Toaster
            position='top-right'
            toastOptions={{
              duration: 4000,
              success: {
                style: {
                  background: '#d2e4e0',
                  border: '1px solid #116954',
                  minHeight: '4rem',
                  color: '#116954'
                }
              },
              error: {
                style: {
                  background: '#f8d7db',
                  border: '1px solid #cc2121',
                  color: '#cc2121',
                  minHeight: '4rem'
                }
              }
            }}
          />
          <PersistGate loading={null} persistor={persistStore(store)}>
            <App />
            <Analytics />
          </PersistGate>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
)
