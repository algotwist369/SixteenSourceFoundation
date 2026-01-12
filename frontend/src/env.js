const getBaseUrl = () => {
    // If accessing via localhost or 127.0.0.1, assume local development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:5000';
    }
    
    // If accessing via a local IP address (e.g., 192.168.x.x), assume backend is on the same IP at port 5000
    // This allows testing on mobile devices on the same WiFi
    const localIpPattern = /^(192\.168\.|10\.|172\.(1[6-9]|2\d|3[0-1]))/;
    if (localIpPattern.test(window.location.hostname)) {
        return `http://${window.location.hostname}:5000`;
    }

    // Default to production URL
    return 'https://api.sixteensourcefoundation.com';
};

export const SERVER_URL = getBaseUrl();