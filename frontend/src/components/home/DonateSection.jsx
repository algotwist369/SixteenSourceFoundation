import React from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import Card from "../common/Card";
import { FaUniversity, FaCopy, FaQrcode, FaCheckCircle, FaHeart } from "react-icons/fa";

const DonateSection = () => {
    const bankDetails = {
        accountName: "Sixteensource Foundation",
        accountNumber: "123456789012",
        ifscCode: "SBIN0001234",
        bankName: "State Bank of India",
        branch: "Dwarka, New Delhi",
        accountType: "Current Account",
        upiId: "donate@sixteensource"
    };

    const copyToClipboard = (text, field) => {
        navigator.clipboard.writeText(text);
        alert(`${field} copied to clipboard!`);
    };

    return (
        <section className="py-20 px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
                        Support Our Mission
                    </h2>
                    <p className="text-xl text-black/90 max-w-2xl mx-auto">
                        Your donation creates real impact. Choose your preferred method to contribute and help us transform lives.
                    </p>
                </div>

                {/* Donation Methods Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    {/* Bank Account Details */}
                    <Card className="p-8 bg-gray-200 border">
                        <div className="flex items-center gap-3 mb-6">
                            <FaUniversity className="text-3xl text-green-600" />
                            <h3 className="text-2xl font-bold text-gray-800">Bank Transfer</h3>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Account Name</p>
                                        <p className="font-semibold text-gray-800">{bankDetails.accountName}</p>
                                    </div>
                                    <button 
                                        onClick={() => copyToClipboard(bankDetails.accountName, "Account Name")}
                                        className="text-green-600 hover:text-green-700"
                                    >
                                        <FaCopy />
                                    </button>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Account Number</p>
                                        <p className="font-semibold text-gray-800 text-lg">{bankDetails.accountNumber}</p>
                                    </div>
                                    <button 
                                        onClick={() => copyToClipboard(bankDetails.accountNumber, "Account Number")}
                                        className="text-green-600 hover:text-green-700"
                                    >
                                        <FaCopy />
                                    </button>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">IFSC Code</p>
                                        <p className="font-semibold text-gray-800 text-lg">{bankDetails.ifscCode}</p>
                                    </div>
                                    <button 
                                        onClick={() => copyToClipboard(bankDetails.ifscCode, "IFSC Code")}
                                        className="text-green-600 hover:text-green-700"
                                    >
                                        <FaCopy />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-sm text-gray-600 mb-1">Bank Name</p>
                                    <p className="font-semibold text-gray-800">{bankDetails.bankName}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-sm text-gray-600 mb-1">Account Type</p>
                                    <p className="font-semibold text-gray-800">{bankDetails.accountType}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm text-gray-600 mb-1">Branch</p>
                                <p className="font-semibold text-gray-800">{bankDetails.branch}</p>
                            </div>
                        </div>
                    </Card>

                    {/* QR Code & UPI */}
                    <Card className="p-8 bg-gray-200 border">
                        <div className="flex items-center gap-3 mb-6">
                            <FaQrcode className="text-3xl text-green-600" />
                            <h3 className="text-2xl font-bold text-gray-800">UPI / QR Code</h3>
                        </div>
                        
                        <div className="text-center">
                            <div className="bg-gray-100 rounded-2xl p-8 mb-6 inline-block">
                                <div className="w-64 h-64 bg-white rounded-xl flex items-center justify-center">
                                    {/* Dummy QR Code Placeholder */}
                                    <div className="text-center">
                                        <FaQrcode className="text-8xl text-gray-400 mb-4 mx-auto" />
                                        <p className="text-gray-500 text-sm">Scan to Pay</p>
                                        <p className="text-green-600 font-semibold mt-2">{bankDetails.upiId}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <div className="text-left">
                                        <p className="text-sm text-gray-600 mb-1">UPI ID</p>
                                        <p className="font-semibold text-gray-800 text-lg">{bankDetails.upiId}</p>
                                    </div>
                                    <button 
                                        onClick={() => copyToClipboard(bankDetails.upiId, "UPI ID")}
                                        className="text-green-600 hover:text-green-700"
                                    >
                                        <FaCopy />
                                    </button>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm">
                                Scan the QR code or use the UPI ID above to make your donation instantly
                            </p>
                        </div>
                    </Card>
                </div>

                {/* Benefits & Trust Indicators */}
            </div>
        </section>
    );
};

export default DonateSection;
