import { useContext } from 'react';
import { SuccessStoriesContext } from '../context/SuccessStoriesContext';

const useSuccessStories = () => {
    const context = useContext(SuccessStoriesContext);

    if (!context) {
        throw new Error('useSuccessStories must be used within a SuccessStoriesProvider');
    }

    return context;
};

export default useSuccessStories;
