import React from "react";

const Section = ({ children, className = "", bgColor = "bg-white" }) => {
    return (
        <section className={`py-16 px-6 ${bgColor} ${className}`}>
            <div className="max-w-6xl mx-auto">{children}</div>
        </section>
    );
};

export default Section;

