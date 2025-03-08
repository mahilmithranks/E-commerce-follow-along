import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/login";
import Signup from "./components/signup";
import Navbar from "./components/Navbar";
import CreateProduct from "./components/Createproduct";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import ForgotPassword from "./components/ForgotPassword";
import MyProducts from "./components/MyProducts";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/my-products" element={<MyProducts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 