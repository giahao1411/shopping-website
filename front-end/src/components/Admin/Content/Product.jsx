import React, { useState } from "react";
import { BiSolidChevronRight, BiSolidChevronLeft } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../styles/Admin/Product.css";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

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
                            <th>Name</th>
                            <th>Image</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <p className="table-footer">
                    Page {page} / {totalPage}
                </p>
            </div>
        </div>
    );
};

export default Product;
