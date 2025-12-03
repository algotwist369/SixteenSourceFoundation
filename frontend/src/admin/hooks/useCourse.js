import { useContext } from 'react';
import { CourseContext } from '../context/CourseContext';

const useCourse = () => {
    const context = useContext(CourseContext);

    if (!context) {
        throw new Error('useCourse must be used within a CourseProvider');
    }

    return context;
};

export default useCourse;
