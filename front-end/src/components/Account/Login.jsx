import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "./InputField";
import Swal from "sweetalert2"; // Import SweetAlert2
import "../../styles/Account/Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // handle submit for login
    // handle submit for login
    const handleSubmit = async (e) => {
        e.preventDefault();

        // check fields
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            // fetch data to back-end
            const response = await axios.post(
                "http://localhost:8080/account/login",
                { email, password }
            );

            const { message, username } = response.data; // Lấy username từ backend

            if (response.status === 200) {
                // Hiển thị pop-up thông báo login thành công
                Swal.fire({
                    icon: 'success',
                    title: message, // Thông báo từ backend
                    showConfirmButton: false,
                    timer: 1500 // Thời gian hiển thị pop-up
                });

                // Lưu thông tin user vào localStorage, bao gồm cả username
                localStorage.setItem("user", JSON.stringify({ username, email }));

                // Điều hướng tới trang admin hoặc home
                navigate("/"); // Hoặc /admin nếu là admin
            }
        } catch (error) {
            console.error("Login failed:", error);
            setError(
                error.response?.data?.message || "An unexpected error occurred."
            );
        } finally {
            setLoading(false); // reset loading state
        }
    };


    return (
        <div className="login-container">
            <h2 className="form-title">Log in</h2>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit} className="login-form">
                <InputField
                    type="email"
                    placeholder="Email Address"
                    icon="envelope"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    type="password"
                    placeholder="Password"
                    icon="lock"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Link to="/account/forgot-password" className="forgot-password-link">
                    Forgot Password?
                </Link>

                <button className="login-button" disabled={loading}>
                    {loading ? "Logging in..." : "Log in"}
                </button>
            </form>

            <p className="register-text">
                Don&apos;t have an account? <Link to="/account/register"> Register now</Link>
            </p>
        </div>
    );
};

export default Login;
