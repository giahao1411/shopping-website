import React from "react";
import "../../../styles/Admin/Content.css";
import ContentHeader from "./ContentHeader";
import Card from "./Card";
import TeacherList from "./TeacherList";

const Content = () => {
    return (
        <div className="content">
            <ContentHeader />
            <Card />
            <TeacherList />
        </div>
    );
};

export default Content;
