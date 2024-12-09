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
import CreateProduct from "../components/Admin/Partials/CreateProduct";
import ProductDetail from "../components/Admin/Partials/ProductDetail";

const AdminRoutes = [
	<Route key="admin-dashboard" path="/admin" element={<Admin />}>
		<Route key="admin-dashboard" index element={<Dashboard />} />
		<Route key="admin-user" path="/admin/user" element={<User />} />,
		<Route key="admin-product" path="/admin/product" element={<Product />} />,
		<Route key="admin-order" path="/admin/order" element={<Order />} />,
		<Route key="admin-category" path="/admin/category" element={<Category />} />,
		<Route key="admin-coupon" path="/admin/coupon" element={<Coupon />} />,
	</Route>,
	<Route key="admin-create-product" path="/admin/product/create" element={<CreateProduct />} />,
	<Route key="admin-product-detail" path="/admin/product/:productId" element={<ProductDetail />} />,
	<Route key="admin-create-category" path="/admin/category/create" element={<CreateCategory />} />,
];

export default AdminRoutes;
