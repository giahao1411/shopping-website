import React from "react";
import { Route } from "react-router-dom";
import Home from "../components/Home/Home";  // Import trang Home

const HomeRoutes = (
  <>
    <Route path="/" element={<Home />} /> {/* Định nghĩa route cho trang chủ */}
  </>
);

export default HomeRoutes;
