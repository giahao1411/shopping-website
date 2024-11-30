import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "./InputField";
import Swal from "sweetalert2"; // Import SweetAlert2
import "../../styles/Account/Login.css";
import { SESSION } from "../../libs/constant";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const googleLogin = async () => {
        window.location.href = "http://localhost:8080/social/google/auth";

        try {
            const response = await axios.get(
                "http://localhost:8080/social/google/auth"
            );
        } catch (error) {
            if (error.response) {
                alert(error.response);
            } else {
                console.error(error);
            }
        }
    };

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

            const { message, user } = response.data; // Lấy username từ backend

            if (response.status === 200) {
                // Hiển thị pop-up thông báo login thành công
                Swal.fire({
                    icon: "success",
                    title: message, // Thông báo từ backend
                    showConfirmButton: false,
                    timer: 1500, // Thời gian hiển thị pop-up
                });

                // Lưu thông tin user vào localStorage, bao gồm cả username
                localStorage.setItem(
                    SESSION,
                    JSON.stringify({ username: user.username, email })
                );

                if (user.role === "user") {
                    navigate("/");
                } else {
                    navigate("/admin");
                }
            }
        } catch (error) {
            if (error.response) {
                setError(
                    error.response?.data?.message ||
                        "An unexpected error occurred."
                );
            } else {
                console.error(error);
            }
        } finally {
            setLoading(false); // reset loading state
        }
    };

    return (
        <div className="login-container">
            <h2 className="form-title">Log in with</h2>
            <div className="social-login">
                <button className="social-button" onClick={googleLogin}>
                    <img
                        src="/google.svg"
                        alt="Google"
                        className="social-icon"
                    />
                    Google
                </button>
                <button className="social-button">
                    <img
                        src="/facebook.svg"
                        alt="Facebook"
                        className="social-icon"
                    />
                    Facebook
                </button>
            </div>

            <p className="separator">
                <span>or</span>
            </p>

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

                <Link
                    to="/account/forgot-password"
                    className="forgot-password-link"
                >
                    Forgot Password?
                </Link>

                <button className="login-button" disabled={loading}>
                    {loading ? "Logging in..." : "Log in"}
                </button>
            </form>

            <p className="register-text">
                Don&apos;t have an account?{" "}
                <Link to="/account/register"> Register now</Link>
            </p>
        </div>
    );
};

export default Login;
