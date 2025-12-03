import React, { useRef, memo, useCallback } from 'react';
import useTeam from '../../hooks/useTeam';
import { Link } from 'react-router-dom';
import { HiPencil, HiTrash } from 'react-icons/hi';
import { SERVER_URL } from '../../../env';

const GetTeam = memo(() => {
    const { teams, loading, error, removeTeam, fetchTeams } = useTeam();
    const hasFetched = useRef(false);

    React.useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        fetchTeams();
    }, [fetchTeams]);

    const handleDelete = useCallback(async (id) => {
        if (window.confirm('Are you sure you want to delete this team member?')) {
            await removeTeam(id);
        }
    }, [removeTeam]);

    if (loading && teams.length === 0) {
        return <div className="text-center py-10">Loading team members...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-600">{error}</div>;
    }

    return (
        <div className="p-6">
            {teams.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No team members found. Add some!</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teams.map((member) => (
                        <div key={member._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="md:flex">
                                <div className="md:flex-shrink-0">
                                    <img
                                        className="h-48 w-full object-cover md:w-48"
                                        src={member.photo ? `${SERVER_URL}/${member.photo}` : 'https://via.placeholder.com/150'}
                                        alt={member.name}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-8 w-full">
                                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{member.role}</div>
                                    <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{member.name}</a>
                                    <p className="mt-2 text-gray-500">{member.email}</p>
                                    <p className="mt-2 text-gray-500">{member.number}</p>

                                    <div className="mt-4 flex space-x-3">
                                        <Link
                                            to={`/admin/team/edit/${member._id}`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <HiPencil className="w-5 h-5" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(member._id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <HiTrash className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
});

GetTeam.displayName = 'GetTeam';

export default GetTeam;
