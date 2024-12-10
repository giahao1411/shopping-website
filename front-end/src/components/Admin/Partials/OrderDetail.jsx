import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { formatMoney, formatNumber, formatDate } from "../../../libs/utilities";

const OrderDetail = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState({});

    const api = import.meta.env.VITE_APP_URL;

    useEffect(() => {
        const fetchOrder = async () => {
            const response = await axios.get(
                `${api}/api/order/orders/${orderId}`
            );

            if (response.status === 200) {
                setOrder(response.data.order);
            } else {
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    console.error(error.message);
                }
            }
        };

        fetchOrder();
    }, [orderId]);

    return (
        <main className="min-h-screen bg-white p-20">
            {/* Checkout section */}
            <div>
                <h1 className="text-3xl font-semibold mb-7">Order Details</h1>

                <div className="space-y-4 border border-gray-400 p-5 rounded-md">
                    <h3 className="text-2xl font-semibold mb-7">
                        Delivery Information
                    </h3>

                    {/* Name input */}
                    <div className="flex items-center space-x-20">
                        <div>
                            <div className="block text-gray-700 my-2">
                                <span className="text-md font-semibold">
                                    Name:{" "}
                                </span>
                                <span className="">{order.username}</span>
                            </div>
                        </div>

                        <div>
                            <div className="block text-gray-700 my-2">
                                <span className="text-md font-semibold">
                                    Phone:{" "}
                                </span>
                                <span className="">{order.phone}</span>
                            </div>
                        </div>

                        <div>
                            <div className="block text-gray-700 my-2">
                                <span className="text-md font-semibold">
                                    Address:{" "}
                                </span>
                                <span className="">{order.address}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="block text-gray-700 my-2">
                            <span className="text-md font-semibold">
                                Created At:{" "}
                            </span>
                            <span className="">
                                {formatDate(order.createdAt)}
                            </span>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="block text-gray-700 my-2">
                            <span className="text-md font-semibold">
                                Expected Delivery At:{" "}
                            </span>
                            <span className="">
                                {formatDate(order.expectedAt)}
                            </span>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="block text-gray-700 my-2">
                            <span className="text-md font-semibold">
                                Delivered At:{" "}
                            </span>
                            <span className="">
                                {formatDate(order.deliveredAt)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cart Summary Section */}
            <div className="bg-white py-10">
                <div className="space-y-4 border border-gray-400 p-5 rounded-md">
                    {order.items && order.items.length > 0 ? (
                        order.items.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-4 p-4"
                            >
                                <img
                                    src={`${api}/${item.productId.images[0]}`}
                                    alt={item.productId.name}
                                    className="w-16 h-16 object-cover"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold">
                                        {item.productId.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Quantity: {formatNumber(item.quantity)}
                                    </p>
                                </div>
                                <p className="font-semibold">
                                    {formatMoney(item.totalPrice)}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="px-5">No items in order</p>
                    )}

                    <hr className="mx-4" />

                    <div className="space-y-2 px-4 text-sm">
                        <div className="flex justify-between items-center">
                            <p className="text-gray-500">Shipping fee:</p>
                            <p className="text-right font-semibold">$2</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-500">VAT:</p>
                            <p className="text-right font-semibold">10%</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-500">Coupon:</p>
                            <p className="text-right font-semibold">
                                5% discount
                            </p>
                        </div>
                    </div>

                    <p className="text-lg px-4 font-semibold">
                        Total Price:{" "}
                        {order &&
                            order.totalPrice &&
                            formatMoney(Number(order.totalPrice))}
                    </p>
                </div>
            </div>
        </main>
    );
};

export default OrderDetail;
