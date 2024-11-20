import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Account/Login";
import Register from "./components/Account/Register";
import ForgotPassword from "./components/Account/ForgotPassword";
import Admin from "./components/Admin/Admin";

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/admin/home" element={<Admin />} />
                    <Route path="/account/login" element={<Login />} />
                    <Route path="/account/register" element={<Register />} />
                    <Route
                        path="/account/forgot-password"
                        element={<ForgotPassword />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
