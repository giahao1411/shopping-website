import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { SESSION } from "../../libs/constant";

const OAuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleGoogleCallback = async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const username = params.get("username");
                const email = params.get("email");
                const role = params.get("role");
                const error = params.get("error");

                if (username && email) {
                    Swal.fire({
                        icon: "success",
                        title: "Google login successful",
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    localStorage.setItem(
                        SESSION,
                        JSON.stringify({ username, email })
                    );

                    navigate(role === "user" ? "/" : "/admin");
                }

                if (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Login Failed",
                        text: error,
                    });
                    navigate("/account/login");
                    return;
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Google login failed",
                    text: "Unable to process the callback.",
                });
                navigate("/account/login");
            }
        };

        handleGoogleCallback();
    }, [navigate]);

    return <div>Processing Google login...</div>;
};

export default OAuthCallback;
