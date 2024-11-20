import React from "react";
import { BiSearch, BiNotification } from "react-icons/bi";
import "../../../styles/Admin/Content.css";

const ContentHeader = ({ title }) => {
    return (
        <div className="content-header">
            <h1 className="header-title">{title}</h1>
            <div className="header-activity">
                <div className="search-box">
                    <input type="text" placeholder="Search anything here..." />
                    <BiSearch className="icon" />
                </div>

                <div className="notify">
                    <BiNotification className="icon" />
                </div>
            </div>
        </div>
    );
};

export default ContentHeader;
