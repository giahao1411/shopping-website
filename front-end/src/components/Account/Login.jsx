import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "./InputField";
import Swal from "sweetalert2"; // Import SweetAlert2
import { SESSION } from "../../libs/constant";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const api = import.meta.env.VITE_APP_URL;

    const googleLogin = () => {
        window.location.href = `${api}/social/google/auth`;
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
            const response = await axios.post(`${api}/account/login`, {
                email,
                password,
            });

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
                    JSON.stringify({
                        userId: user._id,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                    })
                );

                navigate(user.role === "user" ? "/" : "/admin");
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-center text-2xl font-semibold mb-6">
                    Log in with
                </h2>
                <div className="flex gap-4 mb-6">
                    <button
                        className="flex items-center justify-center gap-3 w-full px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                        onClick={googleLogin}
                    >
                        <img
                            src="/google.svg"
                            alt="Google"
                            className="w-6 h-6"
                        />
                        <span className="text-gray-700 font-medium">
                            Google
                        </span>
                    </button>
                </div>

                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
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
                        className="block text-sm text-blue-600 hover:underline"
                    >
                        Forgot Password?
                    </Link>

                    <button
                        className={`w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition ${
                            loading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Log in"}
                    </button>
                </form>

                <p className="text-center text-md mt-4">
                    Don&apos;t have an account?{" "}
                    <Link
                        to="/account/register"
                        className="text-blue-600 hover:underline"
                    >
                        {" "}
                        Register now
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
