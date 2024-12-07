import React from "react";
import { Route } from "react-router-dom";
import Home from "../components/Home/Home";
import MainContent from "../components/Home/Main/MainContent";
import ProductDetail from "../components/Home/Main/ProductDetail";
import Cart from "../components/Home/Main/Cart";
import OrderHistory from "../components/Home/Main/OrderHistory";
import OrderTracking from "../components/Home/Main/OrderTracking";
import UserProfile from "../components/Home/Main/UserProfile";
import Review from "../components/Home/Main/Review";
import Checkout from "../components/Home/Main/Checkout";

const HomeRoutes = [
    <Route key="home" path="/" element={<Home />}>
        <Route key="home" index element={<MainContent />} />
        <Route
            key="home-product-detail"
            path="/details/product/:productId"
            element={<ProductDetail />}
        />
        <Route key="home-cart" path="/cart" element={<Cart />} />
        <Route
            key="home-order-history"
            path="/order-history"
            element={<OrderHistory />}
        />
        <Route
            key="home-order-tracking"
            path="/order-tracking"
            element={<OrderTracking />}
        />
        <Route
            key="home-review"
            path="/review/:orderId"
            element={<Review />}
        />
        <Route key="home-profile" path="/profile" element={<UserProfile />} />
        <Route key="home-checkout" path="/checkout" element={<Checkout />} />
    </Route>,
];

export default HomeRoutes;
