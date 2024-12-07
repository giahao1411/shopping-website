import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Review = () => {
    const { orderId } = useParams(); 
    const navigate = useNavigate();
    
    const [rating, setRating] = useState(0);  
    const [review, setReview] = useState("");  
    const [product, setProduct] = useState(null); 
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [error, setError] = useState(""); 
    const api = import.meta.env.VITE_APP_URL;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${api}/order/${orderId}`);
                if (response.data) {
                    setProduct(response.data.items[0]); 
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [orderId]);

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
            const response = await axios.post(
                `${api}/reviews`, 
                {
                    orderId,
                    rating,
                    review
                }
            );

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

    return (
        <div className="py-20 font-sans min-h-screen">
            <h2 className="text-center text-3xl font-semibold mb-8 text-orange-500">
                Review Product
            </h2>

            {product && (
                <div className="max-w-7xl mx-auto px-4 mb-6 flex items-center">
                    <img src={product.image} alt={product.name} className="w-24 h-24 object-cover mr-4" />
                    <div>
                        <h3 className="text-xl font-semibold">{product.name}</h3>
                        <p className="text-gray-600">Price: ${product.price}</p>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4">
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
