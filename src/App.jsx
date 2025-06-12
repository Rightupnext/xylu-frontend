import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./client/Navbar";
import Home from "./client/Home";
import Footer from "./client/Footer";
import Collection from "./client/Collection";
import ContactPage from "./client/ContactUs";
import ProductDetail from "./client/ProductDetailsPage";
import FaqSection from "./client/FaqSection";
import Login from "./client/Login";
import AddToCart from "./client/AddToCart";
import Layout from "./dashboard/Layout";
import HomeDashboard from "./dashboard/HomeDashboard";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import ScrollToTop from './ScrollToTop'
import CategoryManager from "./dashboard/CategoryManager";
import InventoryManager from "./dashboard/InventoryManager";
function App() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <>
    <ScrollToTop/>
      {!isAdminPath && <Navbar />}

      <Routes>
        {/* 🔓 PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/:collections" element={<Collection />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* 🔒 PRIVATE ROUTES (authenticated users only) */}
        <Route
          path="/:collection/:id"
          element={
            // <PrivateRoute>
            <ProductDetail />
            // </PrivateRoute>
          }
        />
        <Route
          path="/faq"
          element={
            <PrivateRoute>
              <FaqSection />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <AddToCart />
            </PrivateRoute>
          }
        />

        {/* 🔐 ADMIN DASHBOARD (role-based) */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin", "super-admin"]}>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<HomeDashboard />} />
          <Route path="category" element={<CategoryManager />} />
          <Route path="inventory" element={<InventoryManager />} />
        </Route>

        {/* 🔓 LOGIN (only when logged out) */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
      </Routes>

      {!isAdminPath && <Footer />}
    </>
  );
}

export default App;
