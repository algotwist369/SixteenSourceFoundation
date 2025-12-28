import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGallery from '../../hooks/useGallery';
import { HiUpload, HiX } from 'react-icons/hi';

const CreateGallery = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const { uploadImages, loading, error } = useGallery();
    const navigate = useNavigate();

    // Cleanup previews on unmount
    React.useEffect(() => {
        return () => previews.forEach(url => URL.revokeObjectURL(url));
    }, [previews]);

    const processFiles = (files) => {
        setSelectedFiles(files);

        // Revoke old previews to free memory
        previews.forEach(url => URL.revokeObjectURL(url));

        // Create previews (limit to first 50 to prevent browser lag)
        const previewFiles = files.slice(0, 50);
        const newPreviews = previewFiles.map(file => URL.createObjectURL(file));
        setPreviews(newPreviews);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        processFiles(files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
        if (files.length > 0) {
            processFiles(files);
        }
    };

    const removeFile = (index) => {
        // Revoke the object URL for the removed file
        if (previews[index]) {
            URL.revokeObjectURL(previews[index]);
        }

        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedFiles.length === 0) return;

        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append('images', file);
        });

        try {
            await uploadImages(formData);
            navigate('/admin'); // Redirect to dashboard
        } catch (err) {
            console.error("Upload failed", err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Gallery Images</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Select Images
                        </label>
                        <div className="flex items-center justify-center w-full">
                            <label
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${isDragging
                                    ? 'border-blue-500 bg-blue-50 scale-[1.02]'
                                    : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'
                                    }`}
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <HiUpload className={`w-12 h-12 mb-4 transition-colors ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
                                    <p className="mb-2 text-sm text-gray-500">
                                        <span className="font-semibold">{isDragging ? 'Drop images here' : 'Click to upload'}</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-400">PNG, JPG, WEBP or GIF (Up to 200 images, Max 5MB each)</p>
                                    {selectedFiles.length > 0 && !isDragging && (
                                        <p className="mt-4 text-sm font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 animate-in fade-in zoom-in duration-300">
                                            {selectedFiles.length} files prepared
                                        </p>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Previews */}
                    {previews.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Previews {selectedFiles.length > 50 && `(Showing first 50 of ${selectedFiles.length})`}
                            </h3>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 h-48 overflow-y-auto p-2 border rounded-lg bg-gray-50">
                                {previews.map((src, index) => (
                                    <div key={index} className="relative aspect-square group/preview">
                                        <img src={src} alt={`Preview ${index}`} className="w-full h-full object-cover rounded-md border shadow-sm" />
                                        <button
                                            type="button"
                                            onClick={() => removeFile(index)}
                                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-lg opacity-0 group-hover/preview:opacity-100 transition-opacity hover:bg-red-700"
                                            title="Remove image"
                                        >
                                            <HiX className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-end">
                        <button
                            type="button"
                            onClick={() => navigate('/admin')}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || selectedFiles.length === 0}
                            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg flex items-center transition-colors shadow-sm ${loading ? 'opacity-50 cursor-not-allowed text-blue-100' : ''}`}
                        >
                            {loading ? (
                                <>
                                    <span className="animate-pulse mr-2">Uploading {selectedFiles.length} images...</span>
                                </>
                            ) : (
                                `Upload ${selectedFiles.length > 0 ? selectedFiles.length : ''} Images`
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateGallery;
