import React from "react";

const InputField = ({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    required = false,
}) => {
    return (
        <div className="mb-4">
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    {label}
                </label>
            )}
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full px-4 py-2 border border-gray-300 
                   rounded-lg shadow-sm focus:outline-none 
                   focus:ring-2 focus:ring-green-500"
            />
        </div>
    );
};

export default InputField;
