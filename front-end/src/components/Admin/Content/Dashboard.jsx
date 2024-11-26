import React from "react";
import "../../../styles/Admin/Content.css";
import ContentHeader from "./ContentHeader";
import Card from "./Card";
import Profile from "../Profile/Profile";
import TeacherList from "./TeacherList";

const Dashboard = () => {
    return (
        <>
            <div className="content">
                <ContentHeader title="Dashboard" />
                <Card />
                <TeacherList />
            </div>
            <Profile />
        </>
    );
};

export default Dashboard;
