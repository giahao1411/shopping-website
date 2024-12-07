import React from "react";
import { BiBox } from "react-icons/bi";

// temporary for testing UI
const course = [
    {
        title: "Users",
        number: "213",
    },
    {
        title: "Products",
        number: "1,211",
    },
    {
        title: "Orders",
        number: "423",
    },
];

const Card = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {course.map((item, index) => (
                <div
                    className="flex flex-col items-center bg-gray-200 p-5 rounded-lg"
                    key={index}
                >
                    <div className="flex items-center justify-center text-4xl p-5 rounded-2xl text-gray-600">
                        <BiBox />
                    </div>
                    <div className="w-full text-center py-2 text-gray-600 rounded-lg">
                        <h2 className="text-xl font-bold">{item.number}</h2>
                        <h1 className="text-2xl">{item.title}</h1>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;
