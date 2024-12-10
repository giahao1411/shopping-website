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
import SearchResult from "../components/Home/Main/SearchResult";
import OrderDetail from "../components/Home/Main/OrderDetail";
import PrivateRoute from "../libs/check";

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
            element={
                <PrivateRoute allowedRoles={["user"]}>
                    <Cart />
                </PrivateRoute>
            }
        />
        <Route
            key="home-order-history"
            path="/order-history"
            element={
                <PrivateRoute allowedRoles={["user"]}>
                    <OrderHistory />
                </PrivateRoute>
            }
        />
        <Route
            key="home-order-tracking"
            path="/order-tracking"
            element={
                <PrivateRoute allowedRoles={["user"]}>
                    <OrderTracking />
                </PrivateRoute>
            }
        />

        <Route
            key="home-search-results"
            path="/search-results/:query"
            element={<SearchResult />}
        />

        <Route
            key="home-order-detail"
            path="/order-detail/:orderId"
            element={
                <PrivateRoute allowedRoles={["user"]}>
                    <OrderDetail />
                </PrivateRoute>
            }
        />

        <Route
            key="home-review"
            path="/review/:orderId"
            element={
                <PrivateRoute allowedRoles={["user"]}>
                    <Review />
                </PrivateRoute>
            }
        />
        <Route
            key="home-profile"
            path="/profile"
            element={
                <PrivateRoute allowedRoles={["user"]}>
                    <UserProfile />
                </PrivateRoute>
            }
        />
        <Route
            key="home-checkout"
            path="/checkout"
            element={
                <PrivateRoute allowedRoles={["user"]}>
                    <Checkout />
                </PrivateRoute>
            }
        />
    </Route>,
];

export default HomeRoutes;
