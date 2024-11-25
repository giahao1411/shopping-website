import React from "react";
import { BiNotification } from "react-icons/bi";
import "../../../styles/Admin/Content.css";

const ContentHeader = ({ title }) => {
    return (
        <div className="content-header">
            <h1 className="header-title">{title}</h1>
            <div className="header-activity">
                <div className="notify">
                    <BiNotification className="icon" />
                </div>
            </div>
        </div>
    );
};

export default ContentHeader;
