import React from "react";
// import "../../../styles/Admin/TeacherList.css";
import Image1 from "../../../assets/image.jpg";
import { BiInfoCircle } from "react-icons/bi";

// temporary for testing UI
const teachers = [
    {
        image: Image1,
        name: "Prof. John Doe",
        spent: "2,000",
        items: "30",
    },
    {
        image: Image1,
        name: "Prof. John Doe",
        spent: "2,000",
        items: "24",
    },
    {
        image: Image1,
        name: "Prof. John Doe",
        spent: "2,000",
        items: "16",
    },
    {
        image: Image1,
        name: "Prof. John Doe",
        spent: "2,000",
        items: "12",
    },
    {
        image: Image1,
        name: "Prof. John Doe",
        spent: "2,000",
        items: "9",
    },
];

const TeacherList = () => {
    return (
        <div>
            <h2 className="text-3xl text-left font-semibold text-gray-700">
                Top 5 customers
            </h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-none">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-center border-none">
                                #
                            </th>
                            <th className="px-4 py-2 text-center border-none">
                                Customer's username
                            </th>
                            <th className="px-4 py-2 text-center border-none">
                                Spent
                            </th>
                            <th className="px-4 py-2 text-center border-none">
                                Items bought
                            </th>
                            <th className="px-4 py-2 text-center border-none">
                                Info
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher, index) => (
                            <tr
                                className="hover:bg-gray-200 transition ease-in-out"
                                key={index}
                            >
                                <td className="px-4 py-5 text-center border-none">
                                    {index + 1}
                                </td>
                                <td className="px-4 py-5 text-center border-none">
                                    {teacher.name}
                                </td>
                                <td className="px-4 py-5 text-center border-none">
                                    ${teacher.spent}
                                </td>
                                <td className="px-4 py-5 text-center border-none">
                                    {teacher.items} products bought
                                </td>
                                <td className="px-4 py-5 border-none">
                                    <div className="flex justify-center">
                                        <BiInfoCircle className="text-xl text-gray-700 cursor-pointer" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherList;
