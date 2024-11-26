import React from "react";
import { BiBuilding, BiLogoAndroid, BiLogoHtml5 } from "react-icons/bi";

// temporary for testing UI
const course = [
    {
        title: "Web Development",
        duration: "2 Hours",
        icon: <BiLogoHtml5 />,
    },
    {
        title: "App Development",
        duration: "2 Hours",
        icon: <BiLogoAndroid />,
    },
    {
        title: "UX & UI",
        duration: "2 Hours",
        icon: <BiBuilding />,
    },
];

const Card = () => {
    return (
        <div className="card-container">
            {course.map((item, index) => (
                <div className="card" key={index}>
                    <div className="card-cover">{item.icon}</div>
                    <div className="card-title">
                        <h2>{item.title}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;
