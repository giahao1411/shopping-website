import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
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
