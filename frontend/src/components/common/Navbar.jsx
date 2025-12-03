import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Button from "./Button";
import navigationData from "../../data/navigation.json";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { mainNav } = navigationData;
    const navigate = useNavigate();
    const location = useLocation();

    const handleHomeClick = () => {
        if (location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            navigate("/");
        }
    };

    return (
        <nav className="fixed w-full z-50 bg-white shadow-md border-b border-gray-200">
            <div className="max-w-[99rem] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-18 items-center">

                    {/* Logo + Name */}
                    <button
                        onClick={handleHomeClick}
                        className="flex items-center gap-2 text-2xl font-semibold text-green-700 hover:text-green-800 transition"
                    >
                        <img
                            src={'/assets/logo/logos.png'}
                            alt="Organization Logo"
                            className="h-20 w-[19rem] object-contain rounded-md"
                        />
                    </button>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {mainNav.map((link) =>
                            link.name === "Home" ? (
                                <button
                                    key={link.name}
                                    onClick={handleHomeClick}
                                    className="text-gray-700 hover:text-green-600 font-medium transition-colors"
                                >
                                    {link.name}
                                </button>
                            ) : (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`text-gray-700 hover:text-green-600 font-medium transition-colors ${location.pathname === link.path ? "text-green-700" : ""
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            )
                        )}
                        <Button
                            onClick={() => navigate("/donate")}
                            variant="primary"
                            size="md"
                        >
                            Donate
                        </Button>
                    </div>

                    {/* Mobile Toggle Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-green-600 focus:outline-none transition"
                        >
                            {isOpen ? (
                                <HiOutlineX size={28} className="text-green-700" />
                            ) : (
                                <HiOutlineMenu size={28} className="text-green-700" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            <div
                className={`md:hidden bg-white shadow-md transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-4 pb-4 pt-2 space-y-2">
                    {mainNav.map((link) =>
                        link.name === "Home" ? (
                            <button
                                key={link.name}
                                onClick={() => {
                                    handleHomeClick();
                                    setIsOpen(false);
                                }}
                                className="block w-full text-left text-gray-700 hover:text-green-600 font-medium transition"
                            >
                                {link.name}
                            </button>
                        ) : (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block text-gray-700 hover:text-green-600 font-medium transition ${location.pathname === link.path ? "text-green-700" : ""
                                    }`}
                            >
                                {link.name}
                            </Link>
                        )
                    )}
                    <Button
                        onClick={() => {
                            navigate("/donate");
                            setIsOpen(false);
                        }}
                        variant="primary"
                        size="sm"
                        className="w-full"
                    >
                        Donate
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
