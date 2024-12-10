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
    const [relatedProducts, setRelatedProducts] = useState([]); // New state for related products
    const [quantity, setQuantity] = useState(1);
    const [selectedImg, setSelectedImg] = useState("");
    const navigate = useNavigate();
    const api = import.meta.env.VITE_APP_URL;

    // Function to fetch all products
    const fetchAllProducts = async () => {
        try {
            const response = await axios.get(`${api}/api/product/products`);
            if (response.status === 200) {
                return response.data.products; // Return all products
            }
        } catch (error) {
            console.error("Error fetching all products:", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                // Fetch product details
                const response = await axios.get(`${api}/api/product/products/${productId}`);
                if (response.status === 200) {
                    const data = response.data.product;
                    setProduct(data);
                    setQuantity(1);
                    setSelectedImg(data.images[0]);

                    // Fetch all products to find related products based on category
                    const allProducts = await fetchAllProducts();

                    // Filter related products (same category, different productId)
                    const related = allProducts.filter(
                        (item) => item.category === data.category && item._id !== data._id
                    );

                    setRelatedProducts(related); // Update related products state
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
                navigate("/checkout");
            } else {
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
                    <img
                        src={selectedImg}
                        alt={product.name}
                        className="w-[500px] h-[500px] rounded-md object-cover"
                    />

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

                    <div className="flex flex-col gap-y-5 text-xl">
                        <p>
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
                            <strong>Most Sold: </strong> {product.most_sale || "Not Available"}
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

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
                <div className="mt-16 w-full max-w-5xl px-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Related Products</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {relatedProducts.map((relatedProduct) => (
                            <div key={relatedProduct._id} className="border p-5 rounded-lg shadow-lg hover:shadow-xl">
                                <img
                                    src={relatedProduct.images[0]}
                                    alt={relatedProduct.name}
                                    className="w-full h-48 object-cover rounded-md"
                                />
                                <div className="mt-3">
                                    <p className="text-lg font-semibold">{relatedProduct.name}</p>
                                    <p className="text-gray-600">{formatMoney(relatedProduct.price)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
