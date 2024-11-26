import React from "react";
import { Route } from "react-router-dom";
import Admin from "../components/Admin/Admin";
import Dashboard from "../components/Admin/Content/Dashboard";
import User from "../components/Admin/Content/User";
import Product from "../components/Admin/Content/Product";
import Order from "../components/Admin/Content/Order";

const AdminRoutes = [
    <Route key="admin" path="/admin" element={<Admin />}>
        <Route index element={<Dashboard />} />
        <Route key="admin-user" path="user" element={<User />} />
        <Route key="admin-product" path="product" element={<Product />} />
        <Route key="admin-order" path="order" element={<Order />} />
    </Route>,
];

export default AdminRoutes;
