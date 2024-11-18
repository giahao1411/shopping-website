import { useState } from "react";

const InputField = ({ type, placeholder, icon }) => {
    // state to toggle password visibility
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    return (
        <div className="input-wrapper">
            <input
                className="input-field"
                type={isPasswordShown ? "text" : type}
                placeholder={placeholder}
                required
            />
            <i class={`fa fa-${icon}`} aria-hidden="true"></i>
            {type === "password" && (
                <i
                    onClick={() =>
                        setIsPasswordShown((prevState) => !prevState)
                    }
                    class={`fa fa-${isPasswordShown ? "eye" : "eye-slash"}`}
                    aria-hidden="true"
                ></i>
            )}
        </div>
    );
};

export default InputField;
