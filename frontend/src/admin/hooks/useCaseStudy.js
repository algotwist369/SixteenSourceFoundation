import { useContext } from 'react';
import { CaseStudyContext } from '../context/CaseStudyContext';

const useCaseStudy = () => {
    const context = useContext(CaseStudyContext);

    if (!context) {
        throw new Error('useCaseStudy must be used within a CaseStudyProvider');
    }

    return context;
};

export default useCaseStudy;
