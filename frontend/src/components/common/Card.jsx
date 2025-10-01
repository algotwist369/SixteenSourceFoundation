import React from "react";

const Card = ({ children, className = "", hover = true }) => {
    return (
        <div
            className={`p-6 bg-white rounded-2xl shadow-md ${
                hover ? "hover:shadow-xl transition-shadow duration-300" : ""
            } ${className}`}
        >
            {children}
        </div>
    );
};

export default Card;

