import React from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import trainingData from "../../data/trainingData.json";

const TrainingCourses = () => {
    const { section, courses, stats } = trainingData;

    return (
        <section className="py-20 px-6 bg-white">
            <div className="max-w-[99rem] mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        {section.title}
                    </h2>
                    <p className="text-xl text-gray-600 mb-6">
                        {section.subtitle}
                    </p>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
                        {section.description}
                    </p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600 mb-1">
                                {stats.totalCourses}
                            </div>
                            <div className="text-gray-600 text-sm">Courses Available</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600 mb-1">
                                {stats.studentsTrained}
                            </div>
                            <div className="text-gray-600 text-sm">Students Trained</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600 mb-1">
                                {stats.jobPlacement}
                            </div>
                            <div className="text-gray-600 text-sm">Job Placement</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600 mb-1">
                                {stats.successStories}
                            </div>
                            <div className="text-gray-600 text-sm">Success Stories</div>
                        </div>
                    </div>
                </div>

                {/* Course Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {courses.map((course) => (
                        <div key={course.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
                            {/* Course Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={course.image}
                                    alt={course.name}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                                {course.isNew && (
                                    <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        NEW
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                                    {course.duration}
                                </div>
                            </div>

                            {/* Course Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-3">
                                    {course.name}
                                </h3>
                                
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    {course.tagline}
                                </p>

                                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                                    {course.description}
                                </p>

                                {/* Benefits */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-semibold text-gray-800 mb-2">What You'll Learn:</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        {course.benefits.slice(0, 2).map((benefit, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-green-600 mr-2">✓</span>
                                                {benefit}
                                            </li>
                                        ))}
                                        {course.benefits.length > 2 && (
                                            <li className="text-green-600 font-medium">
                                                +{course.benefits.length - 2} more skills
                                            </li>
                                        )}
                                    </ul>
                                </div>

                                {/* CTA Buttons */}
                                <div className="space-y-3">
                                    <Link to={course.enrollmentLink} className="block">
                                        <Button 
                                            variant="primary" 
                                            size="sm" 
                                            className="w-full"
                                        >
                                            Enroll Now - Free
                                        </Button>
                                    </Link>
                                    
                                    <div className="grid grid-cols-2 gap-2">
                                        <Link to={course.volunteerLink}>
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                className="w-full text-xs"
                                            >
                                                Volunteer
                                            </Button>
                                        </Link>
                                        <Link to={course.donateLink}>
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                className="w-full text-xs"
                                            >
                                                Donate
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center">
                    <div className="bg-green-50 rounded-2xl p-8 max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            {section.ctaText}
                        </h3>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/enroll">
                                <Button variant="primary" size="lg">
                                    Browse All Courses
                                </Button>
                            </Link>
                            <Link to="/volunteer">
                                <Button variant="outline" size="lg">
                                    Become a Trainer
                                </Button>
                            </Link>
                            <Link to="/donate">
                                <Button variant="outline" size="lg">
                                    Support Our Training
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrainingCourses;
