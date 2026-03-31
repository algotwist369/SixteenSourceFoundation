import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Card from "../components/common/Card";
import { MdOutlineMail } from "react-icons/md";
import Button from "../components/common/Button";
import { FaPhoneAlt } from "react-icons/fa";
import { getAllTeams } from "../admin/services/team";
import { getImageUrl } from "../utils/image";

const Team = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchTeam = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getAllTeams();
                const rawList = Array.isArray(response?.data)
                    ? response.data
                    : Array.isArray(response)
                        ? response
                        : Array.isArray(response?.data?.data)
                            ? response.data.data
                            : [];

                const normalized = rawList.map((member, idx) => {
                    return {
                        id: member?._id || member?.id || idx,
                        name: member?.name || "Team Member",
                        role: member?.role || "Team",
                        email: member?.email || "",
                        number: member?.number || member?.phone || "",
                        photo: getImageUrl(member?.photo) || "https://via.placeholder.com/200x200?text=Team",
                        details: Array.isArray(member?.details) ? member.details : []
                    };
                });

                setTeam(normalized);
            } catch (err) {
                setError(err?.response?.data?.message || "Unable to load team right now.");
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, []);

    if (loading && team.length === 0) {
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Loading team...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    if (team.length === 0) {
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <p className="text-gray-600">No team members available right now.</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50">


            {/* Team Members */}
            <Section>
                <Heading
                    title="Our Core Team"
                    subtitle="A group of passionate individuals committed to our mission."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-12">
                    {team.map((member) => (
                        <Card
                            key={member.id}
                            className="text-center bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 border border-gray-100 flex flex-col h-full"
                        >
                            <div className="mb-5">
                                <img
                                    src={member.photo}
                                    alt={member.name}
                                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-green-200 shadow-sm"
                                />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                {member.name}
                            </h3>
                            <p className="text-green-600 font-medium mb-4 text-sm tracking-wide">
                                {member.role}
                            </p>
                            
                            <div className="text-gray-600 text-sm space-y-2 mb-4 flex-grow">
                                {member.email && <p className="flex items-center justify-center"><MdOutlineMail className="mr-1" /> {member.email}</p>}
                                {member.number && <p className="flex items-center justify-center"><FaPhoneAlt className="mr-1" /> {member.number}</p>}
                                
                                {member.details.length > 0 && (
                                    <div className="pt-4 border-t border-gray-50 mt-4 space-y-1">
                                        {member.details.map((detail, dIdx) => (
                                            <p key={dIdx} className="text-xs">
                                                <span className="font-semibold text-gray-500">{detail.label}:</span> {detail.value}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* Join Our Team Section */}
            <Section>
                <Heading
                    title="Join Our Team"
                    subtitle={`We're always looking for passionate individuals to join our mission.
                    `}
                />
                <div className="text-center mt-8">
                    <p className="text-gray-600 mb-4">

                    </p>
                    <Link to="/volunteer">
                        <Button variant="outline" size="lg">
                            Be the family member
                        </Button>
                    </Link>
                </div>
            </Section>
        </div>
    );
};

export default Team;
