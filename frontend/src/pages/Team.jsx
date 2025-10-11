import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Card from "../components/common/Card";
import organizationData from "../data/organization.json";
import { MdOutlineMail } from "react-icons/md";
import Button from "../components/common/Button";
import { FaPhoneAlt } from "react-icons/fa";

const Team = () => {
    const { team } = organizationData;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                            key={member.name}
                            className="text-center bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 border border-gray-100"
                        >
                            <div className="mb-5">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-32 h-32 rounded-full mx-auto object-fit border-4 border-green-200 shadow-sm"
                                />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                {member.name}
                            </h3>
                            <p className="text-green-600 font-medium mb-2 text-sm tracking-wide">
                                {member.role}
                            </p>
                            <div className="text-gray-600 text-sm space-y-1">
                                <p><MdOutlineMail className="inline mr-1" /> {member.email}</p>
                                <p><FaPhoneAlt className="inline mr-1" /> +91 {member.phone}</p>
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
