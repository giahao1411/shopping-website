import React from "react";
import { Route } from "react-router-dom";
import Unauthorized from "../components/Error/Unauthorized";

const ErrorRoutes = [
    <Route key="unauthorize" path="/unauthorized" element={<Unauthorized />} />,
];

export default ErrorRoutes;
