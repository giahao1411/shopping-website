import React from "react";

const Footer = () => {
    return (
        <div className="bg-gray-900 text-white py-2">
            <div className="flex flex-wrap justify-around">
                <div className="flex-1 m-5 min-w-[200px]">
                    <h3 className="text-lg">ELECTRONIC DEVICES STORE</h3>
                    <p className="text-sm">
                        <i className="fas fa-phone-alt mr-2"></i> Hotline: 1900213645 - Phone: 0283839999
                    </p>
                </div>

                <div className="flex-1 m-4 min-w-[200px]">
                    <h3 className="text-lg">Follow us</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="text-white text-xl hover:text-blue-500">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="text-white text-xl hover:text-blue-500">
                            <i className="fab fa-tiktok"></i>
                        </a>
                        <a href="#" className="text-white text-xl hover:text-blue-500">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="text-white text-xl hover:text-red-500">
                            <i className="fab fa-youtube"></i>
                        </a>
                        <a href="#" className="text-white text-xl hover:text-blue-400">
                            <i className="fab fa-twitter"></i>
                        </a>
                    </div>
                </div>

                <div className="flex-1 m-4 min-w-[200px]">
                    <h3 className="text-lg">About us</h3>
                    <p className="text-sm"><a href="#" className="hover:underline">Introduce</a></p>
                    <p className="text-sm"><a href="#" className="hover:underline">Loyal Customer</a></p>
                    <p className="text-sm"><a href="#" className="hover:underline">Customer care</a></p>
                    <p className="text-sm"><a href="#" className="hover:underline">Contact</a></p>
                </div>

                <div className="flex-1 m-4 min-w-[200px]">
                    <h3 className="text-lg">About policy</h3>
                    <p className="text-sm"><a href="#" className="hover:underline">General policies and regulations</a></p>
                    <p className="text-sm"><a href="#" className="hover:underline">Rules - payment methods</a></p>
                    <p className="text-sm"><a href="#" className="hover:underline">Shipping Policy</a></p>
                    <p className="text-sm"><a href="#" className="hover:underline">Return policy</a></p>
                    <p className="text-sm"><a href="#" className="hover:underline">Privacy Policy</a></p>
                </div>
            </div>

            {/* Copyright Section */}
            <footer className="bg-gray-900 py-1">
                <div className="max-w-7xl mx-auto text-center text-gray-600">
                    <p className="text-sm text-white">
                        &copy; 2024 BAANHEM. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
