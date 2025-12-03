import { useContext } from 'react';
import { VolunteerContext } from '../context/VolunteerContext';

const useVolunteer = () => {
    const context = useContext(VolunteerContext);

    if (!context) {
        throw new Error('useVolunteer must be used within a VolunteerProvider');
    }

    return context;
};

export default useVolunteer;
