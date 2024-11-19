import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/account/login" element={<Login />} />
                    <Route path="/account/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
