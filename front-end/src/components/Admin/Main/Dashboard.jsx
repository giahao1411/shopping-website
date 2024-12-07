import React from "react";
import ContentHeader from "../Partials/ContentHeader";
import Card from "../Partials/Card";
import Profile from "../Partials/Profile";
import RankingTable from "../Partials/RankingTable";

const Dashboard = () => {
    return (
        <>
            <div className="w-3/4 mx-auto space-y-8">
                <ContentHeader title="Dashboard" />
                <Card />
                <RankingTable />
            </div>
            <Profile />
        </>
    );
};

export default Dashboard;
