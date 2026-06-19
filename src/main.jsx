import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Catalog from './pages/Catalog.jsx'
import Process from './pages/Process.jsx'
import Calculator from './pages/Calculator.jsx'
import Reviews from './pages/Reviews.jsx'
import Contacts from './pages/Contacts.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/process" element={<Process />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contacts" element={<Contacts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
