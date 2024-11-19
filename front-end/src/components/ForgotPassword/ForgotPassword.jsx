import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ForgotPassword.css";
import InputField from "../Utilities/InputField";

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
        <div className="forgot-container">
            <h2 className="form-title">Forgot Password</h2>

            {error && <p className="error-message">{error}</p>}

            {step === 1 && (
                <form onSubmit={handleCheckEmail} className="forgot-form">
                    <InputField
                        type="email"
                        placeholder="Registered Email"
                        icon="envelope"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button className="forgot-button">Check Email</button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleUpdatePassword} className="forgot-form">
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

                    <button className="forgot-button">Update Password</button>
                </form>
            )}

            <p className="back-text">
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
                <Link to="/account/login"> Get back</Link>
            </p>
        </div>
    );
};

export default ForgotPassword;
