import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useGallery from '../../hooks/useGallery';
import { HiUpload, HiX, HiExclamationCircle } from 'react-icons/hi';

const MAX_FILES = 20;
const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const CreateGallery = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [errors, setErrors] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const { uploadImages, loading, error: uploadError } = useGallery();
    const navigate = useNavigate();

    // Cleanup previews on unmount
    React.useEffect(() => {
        return () => previews.forEach(p => URL.revokeObjectURL(p.src));
    }, [previews]);

    const validateFile = (file) => {
        if (file.size > MAX_SIZE_BYTES) {
            return `File "${file.name}" is too large (max ${MAX_SIZE_MB}MB).`;
        }
        if (!file.type.startsWith('image/')) {
            return `File "${file.name}" is not a valid image type.`;
        }
        return null;
    };

    const processFiles = useCallback((files) => {
        const newFiles = [...selectedFiles, ...files];
        const validationErrors = [];

        if (newFiles.length > MAX_FILES) {
            validationErrors.push(`You can only upload a maximum of ${MAX_FILES} images at once.`);
        }

        const validFiles = newFiles.filter(file => {
            const error = validateFile(file);
            if (error) {
                validationErrors.push(error);
                return false;
            }
            return true;
        });

        const finalFiles = validFiles.slice(0, MAX_FILES);

        setSelectedFiles(finalFiles);
        setErrors(validationErrors);

        // Revoke old previews
        previews.forEach(p => URL.revokeObjectURL(p.src));

        // Create new previews
        const newPreviews = finalFiles.map(file => ({ src: URL.createObjectURL(file), name: file.name }));
        setPreviews(newPreviews);
    }, [selectedFiles, previews]);

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

        const files = Array.from(e.dataTransfer.files);
        processFiles(files);
    };

    const removeFile = (index) => {
        URL.revokeObjectURL(previews[index].src);
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedFiles.length === 0 || errors.length > 0) return;

        try {
            await uploadImages(selectedFiles);
            navigate('/admin');
        } catch (err) {
            console.error("Upload failed", err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Gallery Images</h2>

                {(uploadError || errors.length > 0) && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
                        <div className="flex">
                            <div className="py-1">
                                <HiExclamationCircle className="h-6 w-6 text-red-500 mr-3" />
                            </div>
                            <div>
                                <p className="font-bold">Please fix the following issues:</p>
                                <ul className="list-disc list-inside mt-1">
                                    {uploadError && <li>{uploadError}</li>}
                                    {errors.map((err, i) => <li key={i}>{err}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}
                        >
                            <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-full">
                                <HiUpload className={`w-12 h-12 mb-4 transition-colors ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
                                <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-400">Up to {MAX_FILES} images, max {MAX_SIZE_MB}MB each</p>
                                {selectedFiles.length > 0 && (
                                    <p className="mt-4 text-sm font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
                                        {selectedFiles.length} files selected
                                    </p>
                                )}
                            </label>
                            <input id="file-upload" type="file" className="hidden" multiple accept="image/*" onChange={handleFileChange} />
                        </div>
                    </div>

                    {previews.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">Image Previews</h3>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 p-2 border rounded-lg bg-gray-50 max-h-72 overflow-y-auto">
                                {previews.map((p, index) => (
                                    <div key={index} className="relative aspect-square group/preview">
                                        <img src={p.src} alt={`Preview ${p.name}`} className="w-full h-full object-cover rounded-md border shadow-sm" />
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
                        <button type="button" onClick={() => navigate('/admin')} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || selectedFiles.length === 0 || errors.length > 0}
                            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg flex items-center transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {loading ? `Uploading ${selectedFiles.length} images...` : `Upload ${selectedFiles.length} Images`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateGallery;
