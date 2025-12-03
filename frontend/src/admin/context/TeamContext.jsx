import React, { createContext, useState, useCallback } from 'react';
import { getAllTeams, createTeam, updateTeam, deleteTeam, uploadTeamPhoto } from '../services/team';

export const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTeams = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllTeams();
            setTeams(data.data || []);
        } catch (err) {
            setError(err.message || 'Failed to fetch teams');
        } finally {
            setLoading(false);
        }
    }, []);

    const addTeam = useCallback(async (teamData) => {
        setLoading(true);
        setError(null);
        try {
            const newTeam = await createTeam(teamData);
            setTeams((prev) => [newTeam.data, ...prev]);
            return newTeam;
        } catch (err) {
            setError(err.message || 'Failed to create team member');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const editTeam = useCallback(async (id, teamData) => {
        setLoading(true);
        setError(null);
        try {
            const updatedTeam = await updateTeam(id, teamData);
            setTeams((prev) => prev.map((team) => (team._id === id ? updatedTeam.data : team)));
            return updatedTeam;
        } catch (err) {
            setError(err.message || 'Failed to update team member');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const removeTeam = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            await deleteTeam(id);
            setTeams((prev) => prev.filter((team) => team._id !== id));
        } catch (err) {
            setError(err.message || 'Failed to delete team member');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const uploadPhoto = useCallback(async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await uploadTeamPhoto(formData);
            return response;
        } catch (err) {
            setError(err.message || 'Failed to upload photo');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <TeamContext.Provider
            value={{
                teams,
                loading,
                error,
                fetchTeams,
                addTeam,
                editTeam,
                removeTeam,
                uploadPhoto
            }}
        >
            {children}
        </TeamContext.Provider>
    );
};
