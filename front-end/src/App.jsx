import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import AccountRoutes from "./routes/AccountRoutes";
import AdminRoutes from "./routes/AdminRoutes";

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    {AccountRoutes}
                    {AdminRoutes}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
