import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Card from "../common/Card";
import { FaUniversity, FaCopy, FaQrcode } from "react-icons/fa";
import { getAllBankTransfers } from "../../admin/services/bankTransfer";
import { SERVER_URL } from "../../env";

const DonateSection = () => {
    const [bankDetails, setBankDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchBankDetails = async () => {
            try {
                const response = await getAllBankTransfers(1, 1);
                if (response?.success && Array.isArray(response.data) && response.data.length > 0) {
                    setBankDetails(response.data[0]);
                } else {
                    setBankDetails(null);
                }
            } catch (err) {
                setError(err?.response?.data?.message || "Unable to load bank details right now.");
            } finally {
                setLoading(false);
            }
        };

        fetchBankDetails();
    }, []);

    const displayBankDetails = useMemo(() => ({
        accountName: bankDetails?.accoountHolderName,
        accountNumber: bankDetails?.accountNumber,
        ifscCode: bankDetails?.ifscCode,
        bankName: bankDetails?.bankName,
        branch: bankDetails?.branch,
        accountType: bankDetails?.accountType,
        upiId: bankDetails?.upiId,
        qrCodeImage: bankDetails?.qrCodeImage ? `${SERVER_URL}/${bankDetails.qrCodeImage}` : null
    }), [bankDetails]);

    const valueOrPlaceholder = useCallback((value) => {
        if (value) return value;
        return loading ? "Loading..." : "Not available";
    }, [loading]);

    const copyToClipboard = useCallback(async (text, field) => {
        if (!text) return;
        try {
            await navigator.clipboard.writeText(text);
            alert(`${field} copied to clipboard!`);
        } catch (err) {
            console.error("Failed to copy text:", err);
            alert("Unable to copy to clipboard. Please try again.");
        }
    }, []);

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
                    {error && (
                        <p className="text-red-600 text-sm mt-4">
                            {error}
                        </p>
                    )}
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
                                        <p className="font-semibold text-gray-800">
                                            {valueOrPlaceholder(displayBankDetails.accountName)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(displayBankDetails.accountName, "Account Name")}
                                        className="text-green-600 hover:text-green-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                                        disabled={!displayBankDetails.accountName}
                                    >
                                        <FaCopy />
                                    </button>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Account Number</p>
                                        <p className="font-semibold text-gray-800 text-lg">
                                            {valueOrPlaceholder(displayBankDetails.accountNumber)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(displayBankDetails.accountNumber, "Account Number")}
                                        className="text-green-600 hover:text-green-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                                        disabled={!displayBankDetails.accountNumber}
                                    >
                                        <FaCopy />
                                    </button>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">IFSC Code</p>
                                        <p className="font-semibold text-gray-800 text-lg">
                                            {valueOrPlaceholder(displayBankDetails.ifscCode)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(displayBankDetails.ifscCode, "IFSC Code")}
                                        className="text-green-600 hover:text-green-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                                        disabled={!displayBankDetails.ifscCode}
                                    >
                                        <FaCopy />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-sm text-gray-600 mb-1">Bank Name</p>
                                    <p className="font-semibold text-gray-800">
                                        {valueOrPlaceholder(displayBankDetails.bankName)}
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-sm text-gray-600 mb-1">Account Type</p>
                                    <p className="font-semibold text-gray-800">
                                        {valueOrPlaceholder(displayBankDetails.accountType)}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm text-gray-600 mb-1">Branch</p>
                                <p className="font-semibold text-gray-800">
                                    {valueOrPlaceholder(displayBankDetails.branch)}
                                </p>
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
                                {displayBankDetails.qrCodeImage ? (
                                    <div className="w-64 h-64 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                                        <img
                                            src={displayBankDetails.qrCodeImage}
                                            alt="Donation QR Code"
                                            className="object-contain h-full w-full"
                                            loading="lazy"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-64 h-64 bg-white rounded-xl flex items-center justify-center">
                                        <div className="text-center">
                                            <FaQrcode className="text-8xl text-gray-400 mb-4 mx-auto" />
                                            <p className="text-gray-500 text-sm">
                                                {loading ? "Loading QR code..." : "QR code not available"}
                                            </p>
                                            <p className="text-green-600 font-semibold mt-2">
                                                {valueOrPlaceholder(displayBankDetails.upiId)}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <div className="text-left">
                                        <p className="text-sm text-gray-600 mb-1">UPI ID</p>
                                        <p className="font-semibold text-gray-800 text-lg">
                                            {valueOrPlaceholder(displayBankDetails.upiId)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(displayBankDetails.upiId, "UPI ID")}
                                        className="text-green-600 hover:text-green-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                                        disabled={!displayBankDetails.upiId}
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
