import React from "react";
import PageHeader from "../components/common/PageHeader";
import Section from "../components/common/Section";
import Card from "../components/common/Card";
import Heading from "../components/common/Heading";
import { FaUsers, FaGraduationCap, FaHandHoldingHeart, FaHome } from "react-icons/fa";

const Impact = () => {
    const stats = [
        {
            icon: <FaGraduationCap className="text-5xl text-green-600" />,
            number: "5,000+",
            label: "Children Educated",
            description: "Provided quality education and learning resources"
        },
        {
            icon: <FaHandHoldingHeart className="text-5xl text-green-600" />,
            number: "10,000+",
            label: "Meals Served",
            description: "Nutritious meals provided to underprivileged families"
        },
        {
            icon: <FaUsers className="text-5xl text-green-600" />,
            number: "2,000+",
            label: "Volunteers Engaged",
            description: "Dedicated volunteers contributing their time"
        },
        {
            icon: <FaHome className="text-5xl text-green-600" />,
            number: "50+",
            label: "Communities Served",
            description: "Villages and urban slums reached with our programs"
        }
    ];

    const stories = [
        {
            name: "Meera's Journey",
            image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop",
            quote: "The vocational training program changed my life. I now run my own tailoring business and support my family.",
            location: "Rajasthan",
            program: "Women Empowerment"
        },
        {
            name: "Rahul's Success",
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
            quote: "Thanks to the scholarship program, I'm the first person in my family to attend college.",
            location: "Uttar Pradesh",
            program: "Education for All"
        },
        {
            name: "Village Transformation",
            image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop",
            quote: "Clean water access has reduced diseases in our village by 70%. Our children are healthier and happier.",
            location: "Bihar",
            program: "Water & Sanitation"
        }
    ];

    const milestones = [
        { year: "2010", title: "Foundation Established", description: "Started with a small literacy program" },
        { year: "2013", title: "Healthcare Initiative", description: "Launched first mobile medical camp" },
        { year: "2016", title: "Women Empowerment", description: "Trained 500+ women in vocational skills" },
        { year: "2019", title: "Disaster Relief", description: "Provided emergency aid to flood-affected areas" },
        { year: "2022", title: "Digital Education", description: "Launched computer literacy programs" },
        { year: "2024", title: "50+ Communities", description: "Expanded reach to over 50 communities" }
    ];

    return (
        <div>
            <PageHeader
                title="Our Impact"
                subtitle="Real stories, real change, real lives transformed"
                image="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&h=400&fit=crop"
            />

            {/* Impact Statistics */}
            <Section>
                <Heading
                    title="By The Numbers"
                    subtitle="Measuring our impact across communities"
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
                    {stats.map((stat, index) => (
                        <Card key={index} className="text-center">
                            <div className="flex justify-center mb-4">{stat.icon}</div>
                            <h3 className="text-4xl font-bold text-green-600 mb-2">{stat.number}</h3>
                            <h4 className="text-lg font-semibold mb-2">{stat.label}</h4>
                            <p className="text-sm text-gray-600">
                                {stat.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* Success Stories */}
            <Section bgColor="bg-gray-50">
                <Heading
                    title="Stories of Change"
                    subtitle="Real people, real transformations"
                />
                <div className="grid md:grid-cols-3 gap-8 mt-10">
                    {stories.map((story, index) => (
                        <Card key={index} hover={false}>
                            <img
                                src={story.image}
                                alt={story.name}
                                className="w-full h-48 object-cover rounded-xl mb-4"
                            />
                            <h3 className="text-xl font-bold mb-2">{story.name}</h3>
                            <p className="text-gray-600 italic mb-3">
                                "{story.quote}"
                            </p>
                            <div className="flex justify-between text-sm">
                                <span className="text-green-600 font-semibold">{story.location}</span>
                                <span className="text-gray-500">{story.program}</span>
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* Milestones Timeline */}
            <Section>
                <Heading
                    title="Our Journey"
                    subtitle="Key milestones over the years"
                />
                <div className="relative mt-10">
                    {/* Timeline line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-600 hidden md:block"></div>
                    
                    <div className="space-y-8">
                        {milestones.map((milestone, index) => (
                            <div
                                key={index}
                                className={`flex flex-col md:flex-row items-center ${
                                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                }`}
                            >
                                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                                    <Card>
                                        <div className="text-3xl font-bold text-green-600 mb-2">
                                            {milestone.year}
                                        </div>
                                        <h4 className="text-xl font-semibold mb-2">{milestone.title}</h4>
                                        <p className="text-gray-600">
                                            {milestone.description}
                                        </p>
                                    </Card>
                                </div>
                                <div className="hidden md:flex w-8 h-8 bg-green-600 rounded-full border-4 border-white z-10"></div>
                                <div className="md:w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Impact Map */}
            <Section bgColor="bg-green-600">
                <div className="text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Expanding Our Reach</h2>
                    <p className="text-lg mb-4 max-w-3xl mx-auto">
                        From a single village to 50+ communities across multiple states, our impact continues to grow.
                        Together, we're building a more equitable and empowered society.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                            <h3 className="text-4xl font-bold mb-2">8</h3>
                            <p className="text-lg">States Covered</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                            <h3 className="text-4xl font-bold mb-2">50+</h3>
                            <p className="text-lg">Villages Reached</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                            <h3 className="text-4xl font-bold mb-2">25,000+</h3>
                            <p className="text-lg">Lives Touched</p>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default Impact;
