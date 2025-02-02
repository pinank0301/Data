import React, { useState } from 'react'
import Login from './components/Login'
import Hero from './components/Hero'


const App = () => {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {showLogin ? (
        <Login setShowLogin={setShowLogin} />
      ) : (
        <Hero setShowLogin={setShowLogin} />
      )}
    </>
  )
}

export default App
