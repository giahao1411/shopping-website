import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "./InputField";
import "../../styles/Account/Register.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cfPassword, setCfPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== cfPassword) {
            setError("Password does not match.");
            return;
        }

        if (!username || !email || !password || !cfPassword) {
            setError("Please fill in all fields.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:8080/account/register",
                { username, email, password }
            );

            if (response.status === 200) {
                alert(response.data.message);
                navigate("/account/login");
            }

            if (response.status === 406) {
                setError(response.data.message);
            }
        } catch (error) {
            console.error("Register failed:", error);
            setError(
                error.response?.data?.message || "An unexpected error occurred."
            );
        } finally {
            setLoading(false); // reset loading state
        }
    };

    return (
        <div className="register-container">
            <h2 className="form-title">Register</h2>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit} className="register-form">
                <InputField
                    type="text"
                    placeholder="Username"
                    icon="user"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

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

                <InputField
                    type="password"
                    placeholder="Confirm Password"
                    icon="lock"
                    value={cfPassword}
                    onChange={(e) => setCfPassword(e.target.value)}
                />

                <button className="register-button" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>

            <p className="login-text">
                Already have an account?<Link to="/account/login"> Log in</Link>
            </p>
        </div>
    );
};

export default Register;
