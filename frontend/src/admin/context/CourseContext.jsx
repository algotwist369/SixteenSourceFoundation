import React, { createContext, useState, useCallback } from 'react';
import { getAllCourses, createCourse, updateCourse, deleteCourse, uploadCourseImage } from '../services/course';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCourses = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllCourses();
            setCourses(data.data || []);
        } catch (err) {
            setError(err.message || 'Failed to fetch courses');
        } finally {
            setLoading(false);
        }
    }, []);

    const addCourse = useCallback(async (courseData) => {
        setLoading(true);
        setError(null);
        try {
            const newCourse = await createCourse(courseData);
            setCourses((prev) => [newCourse.data, ...prev]);
            return newCourse;
        } catch (err) {
            setError(err.message || 'Failed to create course');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const editCourse = useCallback(async (id, courseData) => {
        setLoading(true);
        setError(null);
        try {
            const updatedCourse = await updateCourse(id, courseData);
            setCourses((prev) => prev.map((course) => (course._id === id ? updatedCourse.data : course)));
            return updatedCourse;
        } catch (err) {
            setError(err.message || 'Failed to update course');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const removeCourse = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            await deleteCourse(id);
            setCourses((prev) => prev.filter((course) => course._id !== id));
        } catch (err) {
            setError(err.message || 'Failed to delete course');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const uploadImage = useCallback(async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await uploadCourseImage(formData);
            return response;
        } catch (err) {
            setError(err.message || 'Failed to upload image');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <CourseContext.Provider
            value={{
                courses,
                loading,
                error,
                fetchCourses,
                addCourse,
                editCourse,
                removeCourse,
                uploadImage
            }}
        >
            {children}
        </CourseContext.Provider>
    );
};
