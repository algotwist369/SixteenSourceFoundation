import React from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import trainingData from "../../data/trainingData.json";

const TrainingCourses = () => {
  const { section, courses } = trainingData;

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-[99rem] mx-auto text-center">
        {/* Section Header */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-3">
          {section.title}
        </h2>
        <p className="text-gray-600 mb-10">{section.subtitle}</p>

        {/* Courses */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
            >
              {/* Full width and height responsive image */}
              <div className="w-full h-100 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 text-left flex-1 flex flex-col justify-between">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {course.name}
                </h3>

                <Link to={course.enrollmentLink}>
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full text-sm"
                  >
                    Enroll Now - Free
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingCourses;
