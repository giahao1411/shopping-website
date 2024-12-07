import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "./InputField";

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
        } catch (error) {
            if (error.response) {
                setError(
                    error.response.data.message ||
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-center text-2xl font-semibold mb-6">
                    Register
                </h2>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
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

                    <button
                        className={`w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition ${
                            loading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Registering in..." : "Register"}
                    </button>
                </form>

                <p className="text-center text-md mt-4">
                    Already have an account?
                    <Link
                        to="/account/login"
                        className="text-indigo-600 hover:underline ml-1"
                    >
                        {" "}
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
