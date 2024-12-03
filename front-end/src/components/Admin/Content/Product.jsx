import React, { useState } from "react";
import {
    BiSolidChevronRight,
    BiSolidChevronLeft,
    BiInfoCircle,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../styles/Admin/Product.css";
import { useEffect } from "react";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/product/products?page=${page}&limit=7`
            );

            if (response.status === 200) {
                setProducts(response.data.products);
                setTotalPage(response.data.totalPages);
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                console.error("Error fetching products", error);
            }
        }
    };

    // move backward 1 page
    const handleBackward = () => {
        // make sure not down below 1
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    // move forward 1 page
    const handleForward = () => {
        setPage((prevPage) => (prevPage < totalPage ? prevPage + 1 : prevPage));
    };

    // page input field
    const handleInputChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (value > 0 && value <= totalPage) {
            setPage(value);
        } else if (value > totalPage) {
            setPage(totalPage);
        } else {
            setPage(1);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [products, page]);

    return (
        <div className="product-list">
            <h1>Product Management</h1>
            <div className="list-header">
                <h2>Product List</h2>
                <div className="pagination">
                    <BiSolidChevronLeft
                        className="page-move"
                        onClick={handleBackward}
                    />
                    <input
                        type="number"
                        min="1"
                        max={totalPage}
                        value={page}
                        onChange={handleInputChange}
                    />
                    <BiSolidChevronRight
                        className="page-move"
                        onClick={handleForward}
                    />
                </div>
            </div>
            <Link to="/admin/product/create" className="create-product-link">
                Create product
            </Link>
            <div className="list-container">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product._id || index}>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.quantity}</td>
                                <td>{product.price}</td>
                                <td>
                                    <Link to={`/admin/product/${product._id}`}>
                                        <BiInfoCircle />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className="table-footer">
                    Page {page} / {totalPage}
                </p>
            </div>
        </div>
    );
};

export default Product;
