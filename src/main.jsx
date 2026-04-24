import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MyListProvider } from './context/mylistcontext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyListProvider>
      <App />
    </MyListProvider>
  </StrictMode>,
)
