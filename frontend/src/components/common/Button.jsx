import React from "react";
import clsx from "clsx"; // optional helper for cleaner class merging

const Button = ({
    children,
    onClick,
    type = "button",
    variant = "primary",
    size = "md",
    className = "",
    disabled = false,
}) => {
    const baseStyles =
        "rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary:
            "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
        secondary:
            "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
        outline:
            "border border-gray-400 text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    };

    const sizes = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={clsx(baseStyles, variants[variant], sizes[size], className)}
        >
            {children}
        </button>
    );
};

export default Button;
