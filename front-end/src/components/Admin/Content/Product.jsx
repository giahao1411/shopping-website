import React, { useState } from "react";
import { BiSolidChevronRight, BiSolidChevronLeft } from "react-icons/bi";
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
            const response = await axios.get(`/api/products?page=${page}`);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page]);

    return (
        <div className="product-list">
            <h1>Product Management</h1>
            <div className="list-header">
                <h2>Product List</h2>
                <div className="pagination">
                    <BiSolidChevronLeft className="page-move" />
                    <input type="number" min="1" max={totalPage} value={page} />
                    <BiSolidChevronRight className="page-move" />
                </div>
            </div>
            <Link to="/admin/product/create" className="create-product-link">
                Create product
            </Link>
            <div className="list-container">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Category</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product._id || index}>
                                <td>{product._id}</td>
                                <td>{product.category}</td>
                                <td>{product.name}</td>
                                <td>
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                    />
                                </td>
                                <td>{product.quantity}</td>
                                <td>{product.price}</td>
                                <td>
                                    <Link to={`/admin/product/${product._id}`}>
                                        Detail
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
