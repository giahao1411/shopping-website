import React from "react";
import { Route } from "react-router-dom";
import Login from "../components/Account/Login";
import Register from "../components/Account/Register";
import ForgotPassword from "../components/Account/ForgotPassword";
import OAuthCallback from "../components/Account/OAuthCallback";

const AccountRoutes = [
    <Route key="account-login" path="/account/login" element={<Login />} />,
    <Route
        key="account-register"
        path="/account/register"
        element={<Register />}
    />,
    <Route
        key="account-forgot-password"
        path="/account/forgot-password"
        element={<ForgotPassword />}
    />,
    <Route
        key="account-oauth"
        path="/account/oauth/callback"
        element={<OAuthCallback />}
    />,
];

export default AccountRoutes;
