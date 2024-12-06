import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Account/ForgotPassword.css";
import InputField from "./InputField";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newCfPassword, setNewCfPassword] = useState("");
    const [error, setError] = useState("");
    const [step, setStep] = useState(1); // step 1: check email, step 2: update password
    const navigate = useNavigate();

    // check email function
    const handleCheckEmail = async (e) => {
        e.preventDefault();
        setError("");

        if (!email) {
            setError("Please fill in email field.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/account/check-email",
                { email }
            );

            if (response.data.existed) {
                setStep(2); // email existed, move to step 2
            }
        } catch (error) {
            console.error("Checking failed:", error);
            setError(
                error.response?.data?.message ||
                    "Error checking email. Please try again."
            );
        }
    };

    // update password function
    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setError("");

        if (newPassword !== newCfPassword) {
            setError("Password does not match.");
            return;
        }

        if (!email || !newPassword || !newCfPassword) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.patch(
                "http://localhost:8080/account/update-password",
                { email, newPassword }
            );

            if (response.status === 200) {
                alert(response.data.message);
                navigate("/account/login");
            }
        } catch (error) {
            console.error("Updating failed:", error);
            setError(
                error.response?.data?.message ||
                    "Error updating password. Please try again."
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-center text-2xl font-semibold mb-6">
                    Forgot Password
                </h2>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                {step === 1 && (
                    <form onSubmit={handleCheckEmail} className="space-y-2">
                        <InputField
                            type="email"
                            placeholder="Registered Email"
                            icon="envelope"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <button className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                            Check Email
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                        <InputField
                            type="password"
                            placeholder="New Password"
                            icon="lock"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <InputField
                            type="password"
                            placeholder="Confirm new password"
                            icon="lock"
                            value={newCfPassword}
                            onChange={(e) => setNewCfPassword(e.target.value)}
                        />

                        <button className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                            Reset Password
                        </button>
                    </form>
                )}

                <p className="text-center text-md mt-6">
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    <Link
                        to="/account/login"
                        className="text-blue-600 hover:underline hover:text-black/75"
                    >
                        {" "}
                        Get back
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
