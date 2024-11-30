import React from "react";
import { Route } from "react-router-dom";
import Admin from "../components/Admin/Admin";
import Dashboard from "../components/Admin/Content/Dashboard";
import User from "../components/Admin/Content/User";
import Product from "../components/Admin/Content/Product";
import Order from "../components/Admin/Content/Order";
import CreateProduct from "../components/Admin/Content/CreateProduct";

const AdminRoutes = [
    <Route key="admin-dashboard" path="/admin" element={<Admin />}>
        <Route key="admin-dashboard" index element={<Dashboard />} />
    </Route>,
    <Route key="admin-user" path="/admin/user" element={<User />} />,
    <Route key="admin-product" path="/admin/product" element={<Product />} />,
    <Route key="admin-order" path="/admin/order" element={<Order />} />,
    <Route key="admin-create-product" path="/admin/product/create" element={<CreateProduct />} />
];

export default AdminRoutes;
