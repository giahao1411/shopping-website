import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Account/Login";
import Register from "./components/Account/Register";
import ForgotPassword from "./components/Account/ForgotPassword";
import Admin from "./components/Admin/Admin";
import Content from "./components/Admin/Content/Content";
import Profile from "./components/Admin/Profile/Profile";
import TeacherList from "./components/Admin/Content/TeacherList";
import User from "./components/Admin/Content/User";
import Product from "./components/Admin/Content/Product";
import Order from "./components/Admin/Content/Order";

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    {/* Account routes */}
                    <Route path="/account/login" element={<Login />} />
                    <Route path="/account/register" element={<Register />} />
                    <Route
                        path="/account/forgot-password"
                        element={<ForgotPassword />}
                    />

                    {/* Admin routes */}
                    <Route path="/admin" element={<Admin />}>
                        <Route
                            index
                            element={
                                <Content title="Dashboard">
                                    <TeacherList />
                                </Content>
                            }
                        />
                        <Route
                            path="user"
                            element={
                                <Content title="User Management">
                                    <User />
                                </Content>
                            }
                        />
                        <Route
                            path="product"
                            element={
                                <Content title="Product Management">
                                    <Product />
                                </Content>
                            }
                        />
                        <Route
                            path="order"
                            element={
                                <Content title="Order Management">
                                    <Order />
                                </Content>
                            }
                        />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
