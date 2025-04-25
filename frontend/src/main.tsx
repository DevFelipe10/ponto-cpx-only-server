// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import AdicionarFaces from './pages/registro-ponto/AdicionarFaces'
import RegistroPonto from './pages/registro-ponto/RegistroPonto'
import Dashboard from './pages/dashboard/Dashboard'
import LoginAdmin from './pages/LoginAdmin'

createRoot(document.getElementById('root')!).render(
  // <ConfigProvider>
  <Router>
    <Routes>
      <Route path="/" element={<LoginAdmin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/registrarponto" element={<RegistroPonto />} />
      <Route path="/adicionarfaces" element={<AdicionarFaces />} />
    </Routes>
  </Router>,
  // </ConfigProvider>,
)
