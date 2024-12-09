import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCartPlus } from "react-icons/fa";
import { formatMoney, formatNumber } from "../../../libs/utilities";
import { SESSION } from "../../../libs/constant";
import Swal from "sweetalert2";

const ProductDetail = () => {
    const storedUser = JSON.parse(localStorage.getItem(SESSION));
    const { productId } = useParams();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImg, setSelectedImg] = useState("");

    const navigate = useNavigate();
    const api = import.meta.env.VITE_APP_URL;

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(
                    `${api}/api/product/products/${productId}`
                );
                if (response.status === 200) {
                    const data = response.data.product;
                    setProduct(data);
                    setQuantity(1);
                    setSelectedImg(data.images[0]);
                }
            } catch (error) {
                if (error.response) {
                    alert("Failed to get product");
                } else {
                    console.error(error);
                }
            }
        };

        // Scroll to top whenever the page is visited or the productId changes
        window.scrollTo(0, 0);

        fetchProductDetails();
    }, [productId]);

    if (!product) {
        return <div className="py-60 my-5">Loading...</div>;
    }

    const handleAddToCart = async () => {
        if (!storedUser) {
            Swal.fire({
                icon: "error",
                title: "You need to login to add to cart",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
        const userId = storedUser.userId;

        try {
            const response = await axios.post(`${api}/api/cart/carts`, {
                userId,
                productId,
                quantity,
            });

            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/");
            }
        } catch (error) {
            if (error.response) {
                Swal.fire({
                    icon: "error",
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                console.error("Error creating product:", error);
            }
        }
    };

    const handleBuyNow = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You can only buy 1 product at a time.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, proceed",
            cancelButtonText: "No, cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                // Nếu người dùng chọn Yes, chuyển đến trang checkout
                navigate("/checkout");
            } else {
                // Nếu người dùng chọn No, không làm gì cả
                console.log("Purchase cancelled");
            }
        });
    };

    const incrementQuantity = () => {
        if (quantity < product.quantity) {
            setQuantity((prevQuantity) => prevQuantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    return (
        <div className="flex flex-col items-center py-8 mt-20 min-h-screen">
            <div className="flex justify-between w-full max-w-5xl bg-gray-100 p-5 rounded-md">
                <div className="relative w-full max-w-md">
                    {/* Main Image */}
                    <img
                        src={selectedImg}
                        alt={product.name}
                        className="w-[500px] h-[500px] rounded-md object-cover"
                    />

                    {/* Thumbnails */}
                    <div className="mt-4 flex justify-start gap-3">
                        {product.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                onClick={() => setSelectedImg(image)}
                                className="w-20 h-20 object-cover cursor-pointer border-2 border-gray-300 hover:border-orange-500 rounded-md transition duration-200"
                            />
                        ))}
                    </div>
                </div>
                <div className="pl-10 w-full max-w-lg text-gray-800">
                    <div className="text-2xl font-bold text-gray-800 mb-5 text-left">
                        {product.name}
                    </div>

                    <hr className="border-t-2 border-orange-500 my-5" />

                    <div className=" flex flex-col gap-y-5 text-xl">
                        <p className="">
                            <strong>Category: </strong>
                            {product.category}
                        </p>
                        <p>
                            <strong>Description: </strong>
                            {product.description}
                        </p>
                        <p>
                            <strong>Price: </strong>
                            {formatMoney(product.price)}
                        </p>
                        <p>
                            <strong>Most Sold: </strong>{" "}
                            {product.most_sale || "Not Available"}
                        </p>
                    </div>

                    <div className="flex items-center py-5">
                        <button
                            className="text-black text-2xl disabled:bg-gray-400 border border-gray-600 px-[10px] rounded-l-md"
                            onClick={decrementQuantity}
                        >
                            -
                        </button>
                        <span className="text-1xl font-semibold border-t border-b border-gray-600 px-5 py-1">
                            {formatNumber(quantity)}
                        </span>
                        <button
                            className="text-black text-2xl disabled:bg-gray-400 border border-gray-600 px-2 rounded-r-md"
                            onClick={incrementQuantity}
                        >
                            +
                        </button>
                    </div>

                    <div className="py-1 flex gap-5">
                        <button
                            className="bg-gray-100 rounded-md border border-green-500 text-green-500 py-3 px-6 text-lg hover:bg-green-500 hover:text-white flex items-center"
                            onClick={handleAddToCart}
                        >
                            <FaCartPlus className="mr-2" /> Add to Cart
                        </button>
                        <button
                            className="bg-red-500 rounded-md text-white py-3 px-6 text-lg hover:text-red-500 hover:bg-gray-100 hover:border hover:border-red-500"
                            onClick={handleBuyNow}
                        >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
