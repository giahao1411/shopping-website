import React from "react";
import { Route } from "react-router-dom";
import Admin from "../components/Admin/Admin";
import Dashboard from "../components/Admin/Main/Dashboard";
import User from "../components/Admin/Main/User";
import Product from "../components/Admin/Main/Product";
import Order from "../components/Admin/Main/Order";
import CreateProduct from "../components/Admin/Partials/CreateProduct";

const AdminRoutes = [
    <Route key="admin-dashboard" path="/admin" element={<Admin />}>
        <Route key="admin-dashboard" index element={<Dashboard />} />
        <Route key="admin-user" path="/admin/user" element={<User />} />,
        <Route
            key="admin-product"
            path="/admin/product"
            element={<Product />}
        />
        ,
        <Route key="admin-order" path="/admin/order" element={<Order />} />,
        <Route
            key="admin-create-product"
            path="/admin/product/create"
            element={<CreateProduct />}
        />
        ,
    </Route>,
];

export default AdminRoutes;
