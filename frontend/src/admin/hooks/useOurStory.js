import { useContext } from 'react';
import { OurStoryContext } from '../context/OurStoryContext';

const useOurStory = () => {
    const context = useContext(OurStoryContext);

    if (!context) {
        throw new Error('useOurStory must be used within a OurStoryProvider');
    }

    return context;
};

export default useOurStory;
