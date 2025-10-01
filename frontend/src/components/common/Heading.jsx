import React from "react";

const Heading = ({ title, subtitle, align = "center" }) => {
    return (
        <div className={`text-${align} mb-6`}>
            <h2 className="text-3xl font-bold text-gray-800">
                {title}
            </h2>
            {subtitle && (
                <p className="mt-2 text-gray-600">{subtitle}</p>
            )}
        </div>
    );
};

export default Heading;