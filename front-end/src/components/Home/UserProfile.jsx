import React from "react";
import { BiSolidPencil, BiSolidUserCircle, BiPlus } from "react-icons/bi";

const UserProfile = () => {
    return (
        <div className="flex justify-start space-x-8 mt-2 ml-2">
            {/* Left card */}
            <div className="mt-10 mb-10 ml-20 max-w-sm max-h-dvh rounded overflow-hidden shadow-md">
                <div className="px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="font-bold text-2xl text-center w-full">
                            Personal
                        </div>
                        <BiSolidPencil className="text-2xl -mr-5 -mt-3 cursor-pointer" />
                    </div>
                    <BiSolidUserCircle className="text-5xl size-4/6 m-auto" />
                    <div className="font-bold text-xl text-center align-middle">
                        User
                    </div>
                    <div className="mt-2 text-sky-700 text-center underline">
                        Profile's links
                    </div>
                    <p className="text-gray-700 text-base mt-4 text-center">
                        Help recruiters get to know you better by describing
                        what makes you a great candidate and sharing other
                        links.
                    </p>
                </div>
                <div className="px-6 pt-4 pb-2 flex justify-center pb-8">
                    <button className="place-items-center flex items-center bg-white hover:bg-gray-100 text-sky-600 font-semibold py-2 px-4 border border-blue-600 rounded">
                        <BiPlus className="text-3xl mr-2" /> Add additional info
                    </button>
                </div>
            </div>

            {/* Right Card */}
            <div className="mt-10 pl-8 pr-10">
                <p className="font-bold text-2xl">Experience</p>

                {/* First Box - Projects */}
                <div className="max-w-90 max-h-80 rounded overflow-hidden shadow-md mt-1">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl text-left">
                            Projects
                        </div>
                        <div className="max-w-70 max-h-60 text-gray-700 mt-4 text-center bg-slate-200 text-black p-5 flex">
                            <p className="text-left w-120">
                                Showcase your skills to recruiters with
                                job-relevant projects. Add projects here to
                                demonstrate your technical expertise and ability
                                to solve real-world problems.
                            </p>
                            <p className="text-sky-600 font-semibold py-2 px-4 w-64">
                                Browse projects
                            </p>
                        </div>
                    </div>
                </div>

                {/* New Box Below Experience */}
                <p className="font-bold text-2xl mt-10">Education</p>
                <div className="max-w-90 max-h-80 rounded overflow-hidden shadow-md mt-1">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl text-left">
                            Credentials
                        </div>
                        <div className="max-w-70 max-h-60 text-gray-700 mt-4 text-center bg-slate-200 text-black p-5 flex">
                            <p className="text-left w-120">
                                Add your educational background here to let
                                employers know where you studied or are
                                currently studying.
                            </p>
                            <p className="text-sky-600 font-semibold py-2 px-4 w-64 text-right">
                                Add education
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
