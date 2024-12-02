import React from "react";
import { Route } from "react-router-dom";
import Home from "../components/Home/Home";
import MainContent from "../components/Home/MainContent";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import Cart from "../components/Cart/Cart";
import Profile from "../components/Account/Profile";
import OrderHistory from "../components/OrderHistory/OrderHistory";


const HomeRoutes = [
    <Route key="home" path="/" element={<Home />}>
        <Route key="home" index element={<MainContent />} />
        <Route
            key="home-product-detail"
            path="/details/product/:productId"
            element={<ProductDetail />}
        />
        <Route
            key="home-cart"
            path="/cart"
            element={<Cart />}
        />
        <Route
            key="home-order-history"
            path="/order-history"
            element={<OrderHistory />}
        />
        <Route
            key="home-profile"
            path="/profile"
            element={<Profile />}
        />
    </Route>,
];

export default HomeRoutes;
