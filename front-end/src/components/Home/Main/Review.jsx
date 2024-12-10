import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { formatMoney } from "../../../libs/utilities";

const Review = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [order, setOrder] = useState(location.state?.orderDetails || null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const api = import.meta.env.VITE_APP_URL;

    useEffect(() => {
        console.log(location.state?.orderDetails); // Log state passed from previous page
        if (!order) {
            setLoading(true);
            const fetchOrder = async () => {
                try {
                    const response = await axios.get(`${api}/api/order/orders/${orderId}`);
                    setOrder(response.data);
                } catch (error) {
                    setError("Error fetching order details.");
                } finally {
                    setLoading(false);
                }
            };
            fetchOrder();
        }
    }, [orderId, order]);

    const handleRatingChange = (rate) => {
        setRating(rate);
    };

    const handleReviewChange = (e) => {
        setReview(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (rating === 0 || review.trim() === "") {
            setError("Please provide both rating and review.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post(`${api}/api/reviews`, {
                orderId,
                rating,
                review,
            });

            if (response.data.success) {
                navigate("/order-history");
            }
        } catch (error) {
            setError("Failed to submit review. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    onClick={() => handleRatingChange(i)}
                    className={`cursor-pointer text-3xl ${i <= rating ? "text-yellow-500" : "text-gray-300"}`}
                >
                    ★
                </span>
            );
        }
        return stars;
    };

    if (loading) {
        return <div className="text-center">Loading order details...</div>;
    }

    return (
        <div className="py-20 font-sans min-h-screen">
            <h2 className="text-center text-3xl font-semibold mb-8 text-orange-500">
                Review Your Order
            </h2>

            {order && order.items && order.items.length > 0 ? (
                <div className="max-w-7xl mx-auto px-4 mb-6">
                    <div className="grid md:grid-cols-2 gap-6 bg-white shadow-lg rounded-lg p-6">
                        <div className="grid grid-cols-2 gap-4">
                            {order.items.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center mb-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-24 h-24 object-cover mr-4 rounded-md"
                                        />
                                        <div>
                                            <h3 className="text-xl font-semibold">{item.name}</h3>
                                            <p className="text-gray-600">Price: {formatMoney(item.price)}</p>
                                            <p className="text-gray-600">Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Order ID:</span>
                                    <span className="font-semibold">{order._id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Items:</span>
                                    <span className="font-semibold">{order.items.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Price:</span>
                                    <span className="font-semibold">{formatMoney(order.totalPrice)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Order Date:</span>
                                    <span className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-500">No order details available</div>
            )}

            <div className="max-w-7xl mx-auto px-4 mt-8">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label className="block text-lg font-semibold mb-2" htmlFor="rating">
                            Rating (1 to 5 Stars)
                        </label>
                        <div className="flex mb-4">
                            {renderStars()}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-semibold mb-2" htmlFor="review">
                            Your Review
                        </label>
                        <textarea
                            id="review"
                            rows="5"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            value={review}
                            onChange={handleReviewChange}
                            placeholder="Write your review here..."
                        ></textarea>
                    </div>

                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    <button
                        type="submit"
                        className={`w-full py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition-colors ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit Review"}
                    </button>
                </form>
            </div>

            <button
                className="block w-48 mx-auto mt-10 py-3 px-6 text-white bg-blue-600 hover:bg-blue-800 rounded-md transition-colors text-lg"
                onClick={() => navigate("/order-history")}
            >
                Back to Order History
            </button>
        </div>
    );
};

export default Review;