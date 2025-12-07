import React, { createContext, useState, useCallback } from 'react';
import { getAllTeams, createTeam, updateTeam, deleteTeam, uploadTeamPhoto } from '../services/team';
import { SERVER_URL } from '../../env';

export const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const normalizeTeamList = (rawList) => {
        return rawList.map((member, idx) => {
            const photo = member?.photo
                ? (member.photo.startsWith('http') ? member.photo : `${SERVER_URL}/${member.photo}`)
                : 'https://via.placeholder.com/200x200?text=Team';

            return {
                ...member,
                _id: member?._id || member?.id || idx,
                name: member?.name || 'Team Member',
                role: member?.role || 'Team',
                email: member?.email || '',
                number: member?.number || member?.phone || '',
                photo
            };
        });
    };

    const extractList = (data) => {
        if (Array.isArray(data?.data)) return data.data;
        if (Array.isArray(data)) return data;
        if (Array.isArray(data?.data?.data)) return data.data.data;
        return [];
    };

    const fetchTeams = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllTeams();
            const list = extractList(data);
            setTeams(normalizeTeamList(list));
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
            const list = extractList(newTeam);
            const normalized = list.length > 0 ? normalizeTeamList(list) : [normalizeTeamList([newTeam.data || newTeam])[0]];
            setTeams((prev) => [...normalized, ...prev]);
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
            const list = extractList(updatedTeam);
            const normalized = list.length > 0 ? normalizeTeamList(list)[0] : normalizeTeamList([updatedTeam.data || updatedTeam])[0];
            setTeams((prev) => prev.map((team) => (team._id === id ? normalized : team)));
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
