import React from "react";
import { BiNotification } from "react-icons/bi";
// import "../../../styles/Admin/Content.css";

const ContentHeader = ({ title }) => {
    return (
        <div className="flex items-center justify-between -mt-1">
            <h1 className="text-3xl font-bold text-gray-700">{title}</h1>
            <div className="flex items-center">
                <div className="bg-gray-200 p-3 rounded-lg text-gray-500 flex items-center">
                    <BiNotification className="text-xl transition-transform duration-200 ease-in-out hover:scale-110 cursor-pointer" />
                </div>
            </div>
        </div>
    );
};

export default ContentHeader;
