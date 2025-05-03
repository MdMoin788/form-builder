import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ToastContainer } from 'react-toastify'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={clientId ? clientId : "726901753694-7fjbtrrab655g55h0gea3mvfqehb3b6a.apps.googleusercontent.com"}>
        <App />
      </GoogleOAuthProvider>
      <ToastContainer />
      <Toaster position="top-center" />
    </BrowserRouter>
  </StrictMode>,
)
