import { useState } from "react";

const InputField = ({ type, placeholder, icon, value, onChange }) => {
    // state to toggle password visibility
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    return (
        <div className="relative mb-6">
            <input
                className="w-full h-12 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                type={isPasswordShown ? "text" : type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <i
                className={`fa fa-${icon} absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400`}
                aria-hidden="true"
            ></i>
            {type === "password" && (
                <i
                    onClick={() =>
                        setIsPasswordShown((prevState) => !prevState)
                    }
                    className={`fa fa-${
                        isPasswordShown ? "eye" : "eye-slash"
                    } absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600`}
                    aria-hidden="true"
                ></i>
            )}
        </div>
    );
};

export default InputField;
