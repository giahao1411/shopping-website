import React, { useState, useEffect } from "react";
import { BiSolidPencil, BiSolidUserCircle, BiPlus } from "react-icons/bi";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import ProfileModal from "../Partials/ProfileModal";
import { SESSION } from "../../../libs/constant";
import Swal from "sweetalert2";
import axios from "axios";
import CreateAddressModal from "../Partials/CreateAddressModal";
import UpdateAddressModal from "../Partials/UpdateAddressModal";

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

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [user, setUser] = useState("");

    const api = import.meta.env.VITE_APP_URL;

    const toggleProfileModal = () => {
        setIsProfileOpen((prevState) => !prevState);
    };

    const toggleCreateModal = () => {
        setIsCreateOpen((prevState) => !prevState);
    };

    const toggleUpdateModal = () => {
        setIsUpdateOpen((prevState) => !prevState);
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
    }, [storedUser.userId]);

    const onAddAddresses = async (newAddress) => {
        setUser((prevUser) => ({
            ...prevUser,
            addresses: [...prevUser.addresses, newAddress],
        }));

        try {
            await axios.patch(
                `${api}/api/user/users/${storedUser.userId}/update-addresses`,
                {
                    addresses: [...user.addresses, newAddress],
                }
            );
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                console.error(error);
            }
        }
    };

    const onUpdateAddress = (oldAddress, newAddress) => {
        setUser((prevUser) => ({
            ...prevUser,
            addresses: prevUser.addresses.map((addr) =>
                addr === oldAddress ? newAddress : addr
            ),
        }));
    };

    const deleteAddress = async (address) => {
        const confirmation = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (confirmation.isConfirmed) {
            try {
                // set state before delete
                setUser((prevUser) => ({
                    ...prevUser,
                    addresses: prevUser.addresses.filter((a) => a !== address),
                }));

                const response = await axios.delete(
                    `${api}/api/user/users/${storedUser.userId}/delete-address/${address}`
                );

                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            } catch (error) {
                // restore if failed
                setUser((prevUser) => ({
                    ...prevUser,
                    addresses: [...prevUser.addresses, address],
                }));

                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    console.error(error);
                }
            }
        }
    };

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
                            onClick={toggleProfileModal}
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
                <p className="font-bold text-2xl">Location</p>

                {/* First Box - Projects */}
                <div className="max-w-90 max-h-80 rounded overflow-hidden shadow mt-1">
                    <div className="px-6 py-4">
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-xl text-left">
                                Addresses
                            </span>
                            <BiPlus
                                className="text-2xl text-blue-600 cursor-pointer hover:text-blue-700"
                                onClick={toggleCreateModal}
                            />
                        </div>
                        <div className="max-w-90 max-h-80 text-gray-700 text-center text-black p-5">
                            {user.addresses && user.addresses.length > 0 ? (
                                <ul className="list-disc pl-5">
                                    {user.addresses.map((address, index) => (
                                        <li key={index} className="mb-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1 text-left">
                                                    {address}
                                                </div>
                                                <div className="flex space-x-2 ">
                                                    <MdModeEditOutline
                                                        className="text-xl cursor-pointer hover:text-blue-700"
                                                        onClick={
                                                            toggleUpdateModal
                                                        }
                                                    />
                                                    <FaTrash
                                                        className="text-xl cursor-pointer hover:text-red-700"
                                                        onClick={() =>
                                                            deleteAddress(
                                                                address
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <UpdateAddressModal
                                                isOpen={isUpdateOpen}
                                                onClose={toggleUpdateModal}
                                                oldAddress={address}
                                                userId={storedUser.userId}
                                                onUpdateAddress={
                                                    onUpdateAddress
                                                }
                                            />
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center text-black p-5">
                                    No addresses added yet.
                                </p>
                            )}
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
                isOpen={isProfileOpen}
                onClose={toggleProfileModal}
                user={user}
                setUser={setUser}
            />

            <CreateAddressModal
                isOpen={isCreateOpen}
                onClose={toggleCreateModal}
                userId={storedUser.userId}
                onAddAddress={onAddAddresses}
            />
        </div>
    );
};

export default UserProfile;
