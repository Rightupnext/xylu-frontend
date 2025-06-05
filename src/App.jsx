import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./client/Navbar";
import Home from "./client/Home";
import Footer from "./client/Footer";
import Collection from "./client/Collection";
import ContactPage from "./client/ContactUs";
import ProductDetail from "./client/ProductDetailsPage";
import FaqSection from "./client/FaqSection";
import Login from "./client/Login";
import AddToCart from "./client/AddToCart";
// import other pages as needed

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":collections" element={<Collection />} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path=":collection/:id" element={<ProductDetail/>} />
        <Route path="/faq" element={<FaqSection/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/cart" element={<AddToCart/>} />

        {/* add more routes as needed */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
