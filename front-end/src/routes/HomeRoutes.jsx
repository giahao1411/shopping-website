import React from "react";
import { Route } from "react-router-dom";
import Home from "../components/Home/Home";
import MainContent from "../components/Home/MainContent";
import ProductDetail from "../components/ProductDetail/ProductDetail";

const HomeRoutes = [
    <Route key="home" path="/" element={<Home />}>
        <Route key="home" index element={<MainContent />} />
        <Route
            key="home-product-detail"
            path="/details/product/:productId"
            element={<ProductDetail />}
        />
    </Route>,
];

export default HomeRoutes;
