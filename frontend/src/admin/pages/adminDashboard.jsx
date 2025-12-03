import React, { useState, lazy, Suspense, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { HiPlus } from 'react-icons/hi';

// Lazy load components for code splitting
const GetFAQ = lazy(() => import('./faq/getFAQ'));
const GetGallery = lazy(() => import('./gallery/getGallery'));
const GetTeam = lazy(() => import('./team/getTeam'));
const GetCourse = lazy(() => import('./course/getCourse'));
const GetBankTransfer = lazy(() => import('./bankTransfer/getBankTransfer'));
const GetCaseStudy = lazy(() => import('./caseStudy/getCaseStudy'));
const GetHero = lazy(() => import('./hero/getHero'));
const GetOurStory = lazy(() => import('./ourStory/getOurStory'));
const GetSuccessStories = lazy(() => import('./successStories/getSuccessStories'));
const GetVolunteer = lazy(() => import('./volunteer/getVolunteer'));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
);

// Tab configuration moved outside component to prevent recreation on each render
const TAB_CONFIG = [
    {
        name: 'FAQs',
        component: GetFAQ,
        createLink: '/admin/faq/create',
        createLabel: 'Create New FAQ'
    },
    {
        name: 'Courses',
        component: GetCourse,
        createLink: '/admin/course/create',
        createLabel: 'Add Course'
    },
    {
        name: 'Gallery',
        component: GetGallery,
        createLink: '/admin/gallery/create',
        createLabel: 'Add New Image'
    },
    {
        name: 'Team',
        component: GetTeam,
        createLink: '/admin/team/create',
        createLabel: 'Add Team Member'
    },
    {
        name: 'Bank Accounts',
        component: GetBankTransfer,
        createLink: '/admin/bank-transfer/create',
        createLabel: 'Add Bank Account'
    },
    {
        name: 'Case Studies',
        component: GetCaseStudy,
        createLink: '/admin/case-study/create',
        createLabel: 'Add Case Study'
    },
    {
        name: 'Hero Slides',
        component: GetHero,
        createLink: '/admin/hero/create',
        createLabel: 'Add Hero Slide'
    },
    {
        name: 'Our Story',
        component: GetOurStory,
        createLink: '/admin/our-story/create',
        createLabel: 'Add Story'
    },
    {
        name: 'Success Stories',
        component: GetSuccessStories,
        createLink: '/admin/success-stories/create',
        createLabel: 'Add Success Story'
    },
    {
        name: 'Volunteers',
        component: GetVolunteer,
        createLink: '/admin/volunteer/create',
        createLabel: 'Add Volunteer'
    }
];

const DashboardFAQ = () => {
    const [activeTab, setActiveTab] = useState('FAQs');

    // Memoize active tab data to prevent recalculation on every render
    const activeTabData = useMemo(
        () => TAB_CONFIG.find(tab => tab.name === activeTab),
        [activeTab]
    );

    // Get the active component
    const ActiveComponent = activeTabData?.component;

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50">
            {/* Tabs Navigation */}
            <div className="flex space-x-1 mb-8 bg-white p-1 rounded-lg shadow-sm w-fit">
                {TAB_CONFIG.map((tab) => (
                    <button
                        key={tab.name}
                        className={`py-2 px-6 rounded-md font-medium transition-all duration-200 ${activeTab === tab.name
                            ? 'bg-blue-100 text-blue-700 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                        onClick={() => setActiveTab(tab.name)}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">{activeTab} Management</h1>
                {activeTabData?.createLink && (
                    <Link
                        to={activeTabData.createLink}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 inline-flex items-center"
                    >
                        <HiPlus className="mr-2" />
                        {activeTabData.createLabel}
                    </Link>
                )}
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden min-h-[400px]">
                {/* Suspense wrapper for lazy-loaded components */}
                <Suspense fallback={<LoadingSpinner />}>
                    {ActiveComponent && <ActiveComponent />}
                </Suspense>
            </div>
        </div>
    );
};

export default DashboardFAQ;
