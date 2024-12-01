import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import AccountRoutes from "./routes/AccountRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import HomeRoutes from "./routes/HomeRoutes";
import ProductDetailRoutes from "./routes/ProductDetailRoutes";
import CartRoutes from "./routes/CartRoutes";   

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    {HomeRoutes}
                    {AccountRoutes}
                    {AdminRoutes}
                    {ProductDetailRoutes}
                    {CartRoutes}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
