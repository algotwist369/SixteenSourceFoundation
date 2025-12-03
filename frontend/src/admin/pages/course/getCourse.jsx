import React, { useRef, memo, useCallback } from 'react';
import useCourse from '../../hooks/useCourse';
import { Link } from 'react-router-dom';
import { HiPencil, HiTrash, HiClock } from 'react-icons/hi';
import { SERVER_URL } from '../../../env';

const GetCourse = memo(() => {
    const { courses, loading, error, removeCourse, fetchCourses } = useCourse();
    const hasFetched = useRef(false);

    React.useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        fetchCourses();
    }, [fetchCourses]);

    const handleDelete = useCallback(async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            await removeCourse(id);
        }
    }, [removeCourse]);

    if (loading && courses.length === 0) {
        return <div className="text-center py-10">Loading courses...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-600">{error}</div>;
    }

    return (
        <div className="p-6">
            {courses.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No courses found. Create one!</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div key={course._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                            <div className="relative h-48">
                                <img
                                    className="w-full h-full object-cover"
                                    src={course.image ? `${SERVER_URL}/${course.image}` : 'https://via.placeholder.com/300x200'}
                                    alt={course.title}
                                    loading="lazy"
                                />
                                {course.isNewCourse && (
                                    <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                                        NEW
                                    </span>
                                )}
                            </div>
                            <div className="p-6 flex-grow flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{course.title}</h3>
                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                        #{course.number}
                                    </span>
                                </div>

                                <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{course.description}</p>

                                <div className="flex items-center text-gray-500 text-sm mb-4">
                                    <HiClock className="mr-1" />
                                    {course.duration || 'N/A'}
                                </div>

                                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                                    <div className="flex space-x-3">
                                        <Link
                                            to={`/admin/course/edit/${course._id}`}
                                            className="text-blue-600 hover:text-blue-800 flex items-center"
                                        >
                                            <HiPencil className="w-5 h-5 mr-1" /> Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(course._id)}
                                            className="text-red-600 hover:text-red-800 flex items-center"
                                        >
                                            <HiTrash className="w-5 h-5 mr-1" /> Delete
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

GetCourse.displayName = 'GetCourse';

export default GetCourse;
