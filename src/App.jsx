import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Home from "./pages/Home";
import  Tables  from "./pages/Tables";
function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/admin" element={<DashboardLayout />}>
        <Route path="" index element={<Home />} />
        <Route path="tables" element={<Tables/>} />
      </Route>
    </Routes>
  );
}

export default App;
