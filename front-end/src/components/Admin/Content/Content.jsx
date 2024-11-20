import React from "react";
import "../../../styles/Admin/Content.css";
import ContentHeader from "./ContentHeader";
import Card from "./Card";
import TeacherList from "./TeacherList";

const Content = ({ title, children }) => {
    return (
        <div className="content">
            <ContentHeader title={title} />
            <Card />
            {children}
        </div>
    );
};

export default Content;
