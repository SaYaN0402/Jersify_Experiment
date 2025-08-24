import React from 'react'
import Navbar from './components/layout/Navbar'
import Cart from './pages/Cart.jsx'
import { LogIn } from 'lucide-react'
import Login from './pages/auth/Login.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
const App = () => {
  return (
    <>
      <Navbar />
      <Cart />
      <Login />
      <ProductDetail />
      
    </>
  )
}

export default App