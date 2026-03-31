export const getYouTubeEmbedUrl = (urlOrId) => {
    if (!urlOrId) return null;

    // If it's already a YouTube ID (11 chars)
    if (urlOrId.length === 11 && !urlOrId.includes('/') && !urlOrId.includes('.')) {
        return `https://www.youtube.com/embed/${urlOrId}`;
    }

    // Regular expression to handle various YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = urlOrId.match(regExp);

    if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
    }

    // If it starts with uploads/, it's a local video
    if (urlOrId.startsWith('uploads/')) {
        return urlOrId;
    }

    return urlOrId;
};
