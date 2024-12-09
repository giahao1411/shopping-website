import React, { useState, useEffect } from "react";
import { BiSolidPencil, BiSolidUserCircle, BiPlus } from "react-icons/bi";
import ProfileModal from "../Partials/ProfileModal";
import { SESSION } from "../../../libs/constant";
import Swal from "sweetalert2";

const UserProfile = () => {
    const storedUser = JSON.parse(localStorage.getItem(SESSION));
    if (!storedUser) {
        Swal.fire({
            icon: "error",
            title: "You need to login to view cart",
            showConfirmButton: false,
            timer: 1500,
        });
        return;
    }

    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState("");

    const api = import.meta.env.VITE_APP_URL;

    const toggleModal = () => {
        setIsOpen((prevState) => !prevState);
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `${api}/api/user/users/${storedUser.userId}`
                );

                if (response.status === 200) {
                    setUser(response.data.user);
                }
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    console.error(error);
                }
            }
        };

        fetchUser();
    });

    return (
        <div className="min-h-screen flex justify-start pt-10">
            {/* Left card */}
            <div className="mt-20 ml-20 w-full h-96 max-w-sm max-h-dvh rounded overflow-hidden shadow">
                <div className="px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="font-bold text-2xl text-center w-full">
                            Personal
                        </div>
                        <BiSolidPencil
                            className="text-2xl -mr-5 -mt-3 cursor-pointer"
                            onClick={toggleModal}
                        />
                    </div>
                    <BiSolidUserCircle className="text-5xl size-4/6 m-auto" />
                    <div className="text-center align-middle">
                        <span className="font-semibold text-xl">
                            {user.username}
                        </span>
                        <br />
                        <span className="text-lg text-gray-400">
                            {user.role}
                        </span>
                    </div>
                </div>
            </div>

            {/* Right Card */}
            <div className="mt-20 pl-8 pr-10">
                <p className="font-bold text-2xl">Experience</p>

                {/* First Box - Projects */}
                <div className="max-w-90 max-h-80 rounded overflow-hidden shadow mt-1">
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
                <div className="max-w-90 max-h-80 rounded overflow-hidden shadow mt-1">
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

            <ProfileModal
                isOpen={isOpen}
                onClose={toggleModal}
                user={user}
                setUser={setUser}
            />
        </div>
    );
};

export default UserProfile;
