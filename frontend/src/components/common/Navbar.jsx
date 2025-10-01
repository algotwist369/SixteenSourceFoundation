import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import navigationData from "../../data/navigation.json";
import organizationData from "../../data/organization.json";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { mainNav } = navigationData;
    const { name } = organizationData;
    const navigate = useNavigate();

    return (
        <nav className="bg-white shadow-md fixed w-full z-50">
            <div className="max-w-[99rem] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-green-600">
                        {name}
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 items-center">
                        {mainNav.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-gray-700 hover:text-green-600 transition"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Button onClick={() => {navigate('/donate')}} variant="primary" size="sm">
                            Donate
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 focus:outline-none"
                        >
                            ☰
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white px-4 pb-4 space-y-2 shadow-md">
                    {mainNav.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className="block text-gray-700 hover:text-green-600 transition"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Button variant="primary" size="sm" className="w-full">
                        Donate
                    </Button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
