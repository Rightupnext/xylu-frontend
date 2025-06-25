import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./client/Navbar";
import Home from "./client/Home";
import Footer from "./client/Footer";
import Collection from "./client/Collection";
import ContactPage from "./client/ContactUs";
import ProductDetail from "./client/ProductDetailsPage";
import ProductOfferDetailsPage from "./client/ProductOfferDetailsPage";
import FaqSection from "./client/FaqSection";
import Login from "./client/Login";
import AddToCart from "./client/AddToCart";
import Layout from "./dashboard/Layout";
import HomeDashboard from "./dashboard/HomeDashboard";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import ScrollToTop from "./ScrollToTop";
import CategoryManager from "./dashboard/CategoryManager";
import InventoryManager from "./dashboard/InventoryManager";
import PageNotFound from "./PageNotFound";
import HeroImageUpload from "./dashboard/HeroImageUpload";
import OrderHistory from "./client/OrderHistory";
import OrderManagement from "./dashboard/OrderManagement";
function App() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!isAdminPath && <Navbar />}

      <Routes>
        {/* 🔓 PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/collections/:collections" element={<Collection />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* 🔒 PRIVATE ROUTES (authenticated users only) */}
        <Route
          path="/collections/:collections/:id"
          element={
            // <PrivateRoute>
            <ProductDetail />
            // </PrivateRoute>
          }
        />
        <Route
          path="/offers/:collections/:id"
          element={
            // <PrivateRoute>
            <ProductOfferDetailsPage />
            // </PrivateRoute>
          }
        />
        <Route
          path="/faq"
          element={
            // <PrivateRoute>
            <FaqSection />
            // </PrivateRoute>
          }
        />
        <Route
          path="/order"
          element={
            <PrivateRoute>
              <OrderHistory />
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
            <PrivateRoute allowedRoles={["admin", "super-admin", "employee"]}>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<HomeDashboard />} />
          <Route path="hero" element={<HeroImageUpload />} />
          <Route path="category" element={<CategoryManager />} />
          <Route path="inventory" element={<InventoryManager />} />
          <Route path="order-management" element={<OrderManagement />} />
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
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {!isAdminPath && <Footer />}
    </>
  );
}

export default App;
