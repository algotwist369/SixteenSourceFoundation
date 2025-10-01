import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
            <h1 className="text-6xl font-bold text-green-600">404</h1>
            <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Page Not Found
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md">
                Oops! The page you’re looking for doesn’t exist or has been moved.
            </p>

            <div className="mt-6 flex space-x-3">
                <Link to="/">
                    <Button variant="primary" size="md">Go Home</Button>
                </Link>
                <Link to="/contact">
                    <Button variant="outline" size="md">Contact Us</Button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
