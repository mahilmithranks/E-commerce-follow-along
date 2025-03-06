import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'
import Login from './pages/login'
import Home from './pages/home'
import Navbar from './pages/Navbar'
import Createproduct from './components/Createproduct'
import MyProducts from './pages/MyProducts'
import Cart from './pages/Cart'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/add-product" element={<Createproduct/>}/>
            <Route path="/my-products" element={<MyProducts/>}/>
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App