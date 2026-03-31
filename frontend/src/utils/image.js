import { SERVER_URL } from '../env';

export const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    
    // Remove leading slash if it exists to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    
    return `${SERVER_URL}/${cleanPath}`;
};
