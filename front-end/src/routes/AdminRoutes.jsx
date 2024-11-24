import React from "react";
import { Route } from "react-router-dom";
import Admin from "../components/Admin/Admin";
import Content from "../components/Admin/Content/Content";
import TeacherList from "../components/Admin/Content/TeacherList";
import User from "../components/Admin/Content/User";
import Product from "../components/Admin/Content/Product";
import Order from "../components/Admin/Content/Order";

const AdminRoutes = [
    <Route key="admin" path="/admin" element={<Admin />}>
        <Route
            index
            element={
                <Content title="Dashboard">
                    <TeacherList />
                </Content>
            }
        />
        <Route
            key="admin-user"
            path="user"
            element={
                <Content title="User Management">
                    <User />
                </Content>
            }
        />
        <Route
            key="admin-product"
            path="product"
            element={
                <Content title="Product Management">
                    <Product />
                </Content>
            }
        />
        <Route
            key="admin-order"
            path="order"
            element={
                <Content title="Order Management">
                    <Order />
                </Content>
            }
        />
    </Route>,
];

export default AdminRoutes;
