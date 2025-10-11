import React from "react";

const PageHeader = ({ title, subtitle, image }) => {
    return (
        <div className="relative h-[45vh] w-full overflow-hidden">
            {image && (
                <>
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-fit"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </>
            )}
            <div className={`${image ? 'absolute' : ''} inset-0 flex flex-col justify-center items-center text-center px-6 ${!image ? 'bg-gradient-to-r from-green-500 to-green-600 h-[40vh]' : ''}`}>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-lg md:text-xl text-white max-w-2xl">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
};

export default PageHeader;

