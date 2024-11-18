import React from "react";
import InputField from "../Utilities/InputField";
import "./Register.css";

const Register = () => {
    return (
        <div className="register-container">
            <h2 className="form-title">Register</h2>

            <form
                method="post"
                action="/account/register"
                className="register-form"
            >
                <InputField type="text" placeholder="Full Name" icon="user" />
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
                <InputField
                    type="password"
                    placeholder="Confirm Password"
                    icon="lock"
                />

                <button className="register-button">Register</button>
            </form>

            <p className="login-text">
                Already have an account? <a href="/account/login">Log in</a>
            </p>
        </div>
    );
};

export default Register;
