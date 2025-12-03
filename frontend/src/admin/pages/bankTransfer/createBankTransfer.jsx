import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useBankTransfer from '../../hooks/useBankTransfer';
import { HiUpload, HiX } from 'react-icons/hi';
import { SERVER_URL } from '../../../env';

const CreateBankTransfer = () => {
    const navigate = useNavigate();
    const { addBankTransfer, uploadQrCodeImage, loading } = useBankTransfer();

    const [formData, setFormData] = useState({
        accoountHolderName: '',
        accountType: 'Savings',
        branch: '',
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        upiId: '',
        qrCodeImage: ''
    });

    const [qrPreview, setQrPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    }, [errors]);

    const handleQrUpload = useCallback(async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setErrors(prev => ({ ...prev, qrCodeImage: 'Please select an image file' }));
            return;
        }

        // Preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setQrPreview(reader.result);
        };
        reader.readAsDataURL(file);

        // Upload
        setUploading(true);
        try {
            const qrPath = await uploadQrCodeImage(file);
            setFormData(prev => ({ ...prev, qrCodeImage: qrPath }));
            setErrors(prev => ({ ...prev, qrCodeImage: '' }));
        } catch (error) {
            setErrors(prev => ({ ...prev, qrCodeImage: 'Failed to upload QR code' }));
            setQrPreview(null);
        } finally {
            setUploading(false);
        }
    }, [uploadQrCodeImage]);

    const removeQrCode = useCallback(() => {
        setFormData(prev => ({ ...prev, qrCodeImage: '' }));
        setQrPreview(null);
    }, []);

    const validate = () => {
        const newErrors = {};

        if (!formData.bankName.trim()) {
            newErrors.bankName = 'Bank name is required';
        }

        if (!formData.accountNumber) {
            newErrors.accountNumber = 'Account number is required';
        } else if (isNaN(formData.accountNumber)) {
            newErrors.accountNumber = 'Account number must be numeric';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            await addBankTransfer(formData);
            navigate('/admin');
        } catch (error) {
            console.error('Error creating bank transfer:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                    <h1 className="text-3xl font-bold text-white">Add New Bank Account</h1>
                    <p className="text-blue-100 mt-2">Enter bank account details for donations</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Account Holder Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Account Holder Name
                            </label>
                            <input
                                type="text"
                                name="accoountHolderName"
                                value={formData.accoountHolderName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="John Doe"
                            />
                        </div>

                        {/* Bank Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bank Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="bankName"
                                value={formData.bankName}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.bankName ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="State Bank of India"
                            />
                            {errors.bankName && (
                                <p className="mt-1 text-sm text-red-600">{errors.bankName}</p>
                            )}
                        </div>

                        {/* Account Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Account Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="accountNumber"
                                value={formData.accountNumber}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono ${errors.accountNumber ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="1234567890"
                            />
                            {errors.accountNumber && (
                                <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>
                            )}
                        </div>

                        {/* Account Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Account Type
                            </label>
                            <select
                                name="accountType"
                                value={formData.accountType}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            >
                                <option value="Savings">Savings</option>
                                <option value="Current">Current</option>
                                <option value="Fixed Deposit">Fixed Deposit</option>
                            </select>
                        </div>

                        {/* IFSC Code */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                IFSC Code
                            </label>
                            <input
                                type="text"
                                name="ifscCode"
                                value={formData.ifscCode}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono uppercase"
                                placeholder="SBIN0001234"
                                style={{ textTransform: 'uppercase' }}
                            />
                        </div>

                        {/* Branch */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Branch
                            </label>
                            <input
                                type="text"
                                name="branch"
                                value={formData.branch}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Main Branch"
                            />
                        </div>

                        {/* UPI ID */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                UPI ID
                            </label>
                            <input
                                type="text"
                                name="upiId"
                                value={formData.upiId}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="example@upi"
                            />
                        </div>

                        {/* QR Code Upload */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                QR Code Image
                            </label>

                            {!qrPreview ? (
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
                                    <div className="space-y-1 text-center">
                                        <HiUpload className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="qr-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                                                <span>Upload QR code</span>
                                                <input
                                                    id="qr-upload"
                                                    name="qr-upload"
                                                    type="file"
                                                    className="sr-only"
                                                    accept="image/*"
                                                    onChange={handleQrUpload}
                                                    disabled={uploading}
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                        {uploading && (
                                            <p className="text-sm text-blue-600 font-medium">Uploading...</p>
                                        )}
                                        {errors.qrCodeImage && (
                                            <p className="text-sm text-red-600">{errors.qrCodeImage}</p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="relative inline-block">
                                    <img
                                        src={qrPreview}
                                        alt="QR Code Preview"
                                        className="h-48 w-48 object-contain border-2 border-gray-300 rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeQrCode}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                    >
                                        <HiX className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="mt-8 flex items-center justify-end space-x-4 border-t pt-6">
                        <button
                            type="button"
                            onClick={() => navigate('/admin')}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || uploading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating...
                                </>
                            ) : (
                                'Create Bank Account'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBankTransfer;
