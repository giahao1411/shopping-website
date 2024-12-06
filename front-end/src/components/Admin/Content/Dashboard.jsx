import React from "react";
// import "../../../styles/Admin/Content.css";
import ContentHeader from "./ContentHeader";
import Card from "./Card";
import Profile from "../Profile/Profile";
import TeacherList from "./TeacherList";

const Dashboard = () => {
    return (
        <>
            <div className="w-3/4 mx-auto space-y-8">
                <ContentHeader title="Dashboard" />
                <Card />
                <TeacherList />
            </div>
            <Profile />
        </>
    );
};

export default Dashboard;
