import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./client/Navbar";
import Home from "./client/Home";
import Footer from "./client/Footer";
import Collection from "./client/Collection";
import ContactPage from "./client/ContactUs";
import ProductDetail from "./client/ProductDetailsPage";
import FaqSection from "./client/FaqSection";
import Login from "./client/Login";
import AddToCart from "./client/AddToCart";
import CursorFollower from "./client/CursorFollower";
import Layout from "./dashboard/Layout";
import HomeDashboard from "./dashboard/HomeDashboard";

function App() {
  const location = useLocation();
  const shouldHideLayout = location.pathname.startsWith("/admin");
  return (
    <>
      {/* <CursorFollower/> */}
      {!shouldHideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":collections" element={<Collection />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path=":collection/:id" element={<ProductDetail />} />
        <Route path="/faq" element={<FaqSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<AddToCart />} />
        <Route path="/admin" element={<Layout />}>
          <Route path="" element={<HomeDashboard />} />
        </Route>
      </Routes>
      {!shouldHideLayout && <Footer />}
    </>
  );
}

export default App;
