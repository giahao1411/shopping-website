import React from "react";
import { BiBox } from "react-icons/bi";

// temporary for testing UI
const course = [
    {
        title: "iPhone 15",
    },
    {
        title: "Mac Book Air M2",
    },
    {
        title: "Machanical Keyboard",
    },
];

const Card = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {course.map((item, index) => (
                <div
                    className="flex flex-col items-center bg-gray-200 p-5 rounded-lg transition-transform duration-200 ease-in-out hover:scale-105"
                    key={index}
                >
                    <div className="flex items-center justify-center bg-white text-4xl p-5 rounded-2xl text-gray-500">
                        <BiBox />
                    </div>
                    <div className="w-full text-center py-2 text-gray-600 rounded-lg">
                        <h2 className="text-2xl">{item.title}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;
