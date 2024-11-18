import React from "react";
import InputField from "../Utilities/InputField";
import "./Login.css";

const Login = () => {
    return (
        <div className="login-container">
            <h2 className="form-title">Log in</h2>

            <form method="post" action="/account/login" className="login-form">
                <InputField
                    type="email"
                    placeholder="Email Address"
                    icon="envelope"
                />
                <InputField
                    type="password"
                    placeholder="Password"
                    icon="lock"
                />

                <a
                    href="/account/forgot-password"
                    className="forgot-password-link"
                >
                    Forgot Password?
                </a>

                <button className="login-button">Log In</button>
            </form>

            <p className="register-text">
                Don&apos;t have an account?{" "}
                <a href="/account/register">Register now</a>
            </p>
        </div>
    );
};

export default Login;
