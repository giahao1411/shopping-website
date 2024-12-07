import React from "react";
import Image1 from "../../../assets/image.jpg";

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

const RankingTable = () => {
    return (
        <div>
            <h2 className="text-3xl text-left font-semibold text-gray-700">
                Top 5 customers
            </h2>
            <div className="pt-10">
                <table className="table-auto w-full border-none">
                    <thead>
                        <tr>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RankingTable;
