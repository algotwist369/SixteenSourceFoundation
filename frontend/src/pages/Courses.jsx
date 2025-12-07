import React, { useMemo, memo, useEffect, useState, useRef } from "react";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Button from "../components/common/Button";
import { getAllCourses } from "../admin/services/course";
import { SERVER_URL } from "../env";

// WhatsApp phone number (from organization data)
const WHATSAPP_PHONE = "919930721145"; // +91-9930721145 without dashes

// Function to generate WhatsApp URL with course details
const getWhatsAppUrl = (course) => {
  const message = `Hello! I'm interested in enrolling in the course:

*${course.name}*

Duration: ${course.duration}
${course.tagline ? `\n${course.tagline}` : ''}

Please provide me with more details about enrollment.`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
};

// Memoized Course Card Component to prevent re-renders
const CourseCard = memo(({ course }) => {
  const topicsList = useMemo(() => {
    if (!course.topics || course.topics.length === 0) return null;
    return course.topics.map((topic, index) => (
      <li key={`${course.id}-${index}`} className="flex items-start gap-2 text-sm text-gray-600">
        <span className="text-green-600 font-bold mt-0.5 flex-shrink-0">✓</span>
        <span>{topic}</span>
      </li>
    ));
  }, [course.topics, course.id]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row sm:h-[480px]">
      {/* Image - Responsive Side by Side */}
      <div className="w-full sm:w-2/5 flex-shrink-0 h-[250px] sm:h-full bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={course.image}
          alt={course.name}
          className="w-full h-full object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>
      
      {/* Content */}
      <div className="w-full sm:w-3/5 p-4 sm:p-6 flex flex-col h-full justify-between">
        <div>
          {/* New Badge */}
          <div className="h-6 mb-2 flex items-start justify-end">
            {course.isNew && (
              <span className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                New
              </span>
            )}
          </div>
          
          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
            {course.name}
          </h3>
          
          {/* Tagline */}
          <div className="mb-3 min-h-[20px]">
            {course.tagline && (
              <p className="text-green-600 font-medium text-xs sm:text-sm">
                {course.tagline}
              </p>
            )}
          </div>
          
          {/* Duration */}
          <div className="mb-4 pb-4 border-b border-gray-100">
            <span className="text-xs sm:text-sm text-gray-700">
              <span className="font-semibold">Duration:</span> {course.duration}
            </span>
          </div>

          {/* Topics - Responsive Two Columns */}
          <div className="mb-4 min-h-[150px] sm:min-h-[180px] max-h-[180px] overflow-y-auto pr-2" style={{scrollbarWidth: 'thin'}}>
            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3 sticky top-0 bg-white pb-1">
              Topics Covered:
            </h4>
            {topicsList ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-1.5">
                {topicsList}
              </ul>
            ) : (
              <p className="text-xs sm:text-sm text-gray-500">Topics coming soon...</p>
            )}
          </div>
        </div>
        
        {/* Button - Fixed at bottom */}
        <div className="pt-4 border-t border-gray-100 mt-auto">
          <a
            href={getWhatsAppUrl(course)}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <Button variant="primary" size="md" className="w-full text-sm sm:text-base">
              Enroll Now
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
});

CourseCard.displayName = "CourseCard";

const Courses = memo(() => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  const section = {
    title: "Training & Courses We Offer",
    description: "Every skill you learn here is a step toward independence and lifelong impact.",
    subtitle: "Learn new skills, become job-ready, and transform your future"
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllCourses();
        const rawList = Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response)
            ? response
            : Array.isArray(response?.data?.data)
              ? response.data.data
              : [];

        const normalized = rawList.map((course, index) => {
          const img = course?.image;
          const imageSrc = img
            ? (img.startsWith("http") ? img : `${SERVER_URL}/${img}`)
            : "https://via.placeholder.com/600x400?text=Course";

          const topics = Array.isArray(course?.topics) ? course.topics : [];

          return {
            id: course?._id || course?.id || index,
            name: course?.name || course?.title || `Course ${index + 1}`,
            tagline: course?.tagline || "",
            description: course?.description || "",
            duration: course?.duration || "Duration not specified",
            topics,
            image: imageSrc,
            isNew: Boolean(course?.isNewCourse || course?.isNew)
          };
        });

        setCourses(normalized);
      } catch (err) {
        setError(err?.response?.data?.message || "Unable to load courses right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading && courses.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20 pb-12 sm:pb-16 flex items-center justify-center">
        <p className="text-gray-600">Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20 pb-12 sm:pb-16 flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20 pb-12 sm:pb-16 flex items-center justify-center">
        <p className="text-gray-600">No courses available right now. Please check back soon.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20 pb-12 sm:pb-16">
      <Section bgColor="bg-gray-50">
        <div className="max-w-[99rem] mx-auto px-4 sm:px-6 lg:px-8">
          <Heading
            title={section.title}
            subtitle={section.description}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-10">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
});

Courses.displayName = "Courses";

export default Courses;
