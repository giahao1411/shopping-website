import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const CreateCategory = () => {
    const [type, setType] = useState("");

    const navigate = useNavigate();
    const api = import.meta.env.VITE_APP_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${api}/api/category/categories`,
                { type }
            );

            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/admin/category");
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                console.error(error);
            }
        }
    };

    return (
        <div className="max-w-lg mx-auto my-10 p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Create New Product
            </h1>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <label
                    htmlFor="type"
                    className="block text-gray-700 font-semibold mb-2"
                >
                    Category type:
                </label>
                <input
                    id="type"
                    type="text"
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                />

                <button
                    type="submit"
                    className="w-full py-3 text-white font-semibold rounded bg-blue-600 hover:bg-blue-700"
                >
                    Create Product
                </button>
            </form>

            <Link
                to="/admin/category"
                className="block mt-6 text-center text-blue-600 hover:underline"
            >
                Back to Category List
            </Link>
        </div>
    );
};

export default CreateCategory;
