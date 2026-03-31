const extractYouTubeId = (url) => {
    if (!url) return null;
    
    // Regular expression to handle various YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    
    // If it's a match and the ID length is standard (11 chars), return the ID
    if (match && match[2].length === 11) {
        return match[2];
    }
    
    // If it's not a YouTube URL, return the original string
    return url;
};

module.exports = { extractYouTubeId };
