import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import InputField from "./InputField";
import "../../styles/Account/Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:8080/account/login",
                { email, password }
            );
            console.log(response);
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
                Don&apos;t have an account?
                <Link to="/account/register"> Register now</Link>
            </p>
        </div>
    );
};

export default Login;
