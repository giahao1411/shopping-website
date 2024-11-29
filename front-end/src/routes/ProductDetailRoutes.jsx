import React from "react";
import { Route } from "react-router-dom";
import ProductDetail from "../components/ProductDetail/ProductDetail";

const ProductDetailRoutes = (
    <>
        <Route path="/product/:productId" element={<ProductDetail />} />{" "}
        {/* Định nghĩa route cho trang chủ */}
    </>
);

export default ProductDetailRoutes;
