import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'
import Login from './pages/login'
import Home from './pages/home'
import Navbar from './pages/Navbar'
import Createproduct from './components/Createproduct'
import MyProducts from './pages/MyProducts'
import Cart from './pages/Cart'
import ProductDetails from './pages/ProductDetails'
import EditProduct from './pages/EditProduct'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/add-product" element={<Createproduct/>}/>
          <Route path="/my-products" element={<MyProducts/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/product/:id" element={<ProductDetails/>}/>
          <Route path="/edit-product/:id" element={<EditProduct/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App