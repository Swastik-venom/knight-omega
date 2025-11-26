import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// Import App.tsx explicitly - it has AuthProvider and the modern UI
import App from './App.tsx'
import './globals.css'
import './i18n/i18n' // Initialize i18n
import './helpers/consolePlayground' // Initialize playground console methods

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
