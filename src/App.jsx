import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import CompanyStocks from './CompanyStocks'

const DashboardWithNavbar = () => (
  <>
    <Navbar />
    <Dashboard />
  </>
)

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardWithNavbar />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/company/stocks/:id" element={<CompanyStocks/>} />
      </Routes>
    </Router>
  )
}

export default App
