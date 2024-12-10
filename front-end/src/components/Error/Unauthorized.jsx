import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full text-center">
                <h1 className="text-4xl font-semibold text-red-500">403</h1>
                <p className="mt-4 text-xl text-gray-700">
                    You do not have permission to view this page.
                </p>
                <Link
                    to="/"
                    className="mt-6 inline-block text-blue-500 hover:text-blue-700"
                >
                    Go Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Unauthorized;
