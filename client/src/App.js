import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import PageRoutes from './routes'

const App = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return <PageRoutes />
}

export default App
