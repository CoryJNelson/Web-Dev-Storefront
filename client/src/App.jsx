import React from 'react'
import './styles/main.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductByID from './pages/ProductByID'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import AccountPage from './pages/AccountPage'

const App = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={<Home />} />
                <Route path="products" element={<Products />} />
                <Route path="products/:id" element={<ProductByID />} />
                <Route path="about" element={<About />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="users/:id" element={<AccountPage />} />
                <Route path="cart" element={<Cart />} />
            </Route>
        </Routes>
    </Router>
  )
}

export default App
