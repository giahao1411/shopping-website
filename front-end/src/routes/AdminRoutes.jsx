import React from "react";
import { Route } from "react-router-dom";
import Admin from "../components/Admin/Admin";
import Category from "../components/Admin/Main/Category";
import Coupon from "../components/Admin/Main/Coupon";
import Dashboard from "../components/Admin/Main/Dashboard";
import Order from "../components/Admin/Main/Order";
import Product from "../components/Admin/Main/Product";
import User from "../components/Admin/Main/User";
import CreateCategory from "../components/Admin/Partials/CreateCategory";
import CreateCoupon from "../components/Admin/Partials/CreateCoupon";
import CreateProduct from "../components/Admin/Partials/CreateProduct";
import ProductDetail from "../components/Admin/Partials/ProductDetail";
import OrderDetail from "../components/Admin/Partials/OrderDetail";
import PrivateRoute from "../libs/check";

const AdminRoutes = [
    <Route
        key="admin-dashboard"
        path="/admin"
        element={
            <PrivateRoute allowedRoles={["admin", "superadmin"]}>
                <Admin />
            </PrivateRoute>
        }
    >
        <Route key="admin-dashboard" index element={<Dashboard />} />
        <Route
            key="admin-user"
            path="/admin/user"
            element={
                <PrivateRoute allowedRoles={["admin", "superadmin"]}>
                    <User />
                </PrivateRoute>
            }
        />
        <Route
            key="admin-product"
            path="/admin/product"
            element={
                <PrivateRoute allowedRoles={["admin", "superadmin"]}>
                    <Product />
                </PrivateRoute>
            }
        />
        <Route
            key="admin-order"
            path="/admin/order"
            element={
                <PrivateRoute allowedRoles={["admin", "superadmin"]}>
                    <Order />
                </PrivateRoute>
            }
        />
        <Route
            key="admin-category"
            path="/admin/category"
            element={
                <PrivateRoute allowedRoles={["admin"]}>
                    <Category />
                </PrivateRoute>
            }
        />
        <Route
            key="admin-coupon"
            path="/admin/coupon"
            element={
                <PrivateRoute allowedRoles={["admin"]}>
                    <Coupon />
                </PrivateRoute>
            }
        />
    </Route>,
    <Route
        key="admin-create-product"
        path="/admin/product/create"
        element={
            <PrivateRoute allowedRoles={["admin", "superadmin"]}>
                <CreateProduct />
            </PrivateRoute>
        }
    />,
    <Route
        key="admin-product-detail"
        path="/admin/product/:productId"
        element={
            <PrivateRoute allowedRoles={["admin", "superadmin"]}>
                <ProductDetail />
            </PrivateRoute>
        }
    />,
    <Route
        key="admin-create-category"
        path="/admin/category/create"
        element={
            <PrivateRoute allowedRoles={["admin"]}>
                <CreateCategory />
            </PrivateRoute>
        }
    />,
    <Route
        key="admin-create-coupon"
        path="/admin/coupon/create"
        element={
            <PrivateRoute allowedRoles={["admin"]}>
                <CreateCoupon />
            </PrivateRoute>
        }
    />,
    <Route
        key="admin-order-detail"
        path="/admin/order/:orderId"
        element={
            <PrivateRoute allowedRoles={["admin", "superadmin"]}>
                <OrderDetail />
            </PrivateRoute>
        }
    />,
];

export default AdminRoutes;
