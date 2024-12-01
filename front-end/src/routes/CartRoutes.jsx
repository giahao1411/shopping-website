import React from "react";
import Cart from "../components/Cart/Cart"; // Import Cart từ thư mục Cart
import { Route } from "react-router-dom";

const CartRoutes = (
    <>
        <Route path="/cart" element={<Cart />} />{" "}
        {/* Định nghĩa route cho trang chủ */}
    </>
);

export default CartRoutes;
