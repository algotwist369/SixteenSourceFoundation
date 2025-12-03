import React, { useEffect, useRef, memo } from 'react';
import useFAQ from '../../hooks/useFAQ';
import { Link } from 'react-router-dom';
import { HiPencil, HiTrash } from 'react-icons/hi';

const GetFAQ = memo(() => {
    const { faqs, loading, error, removeFaq, fetchFaqs } = useFAQ();
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        fetchFaqs();
    }, [fetchFaqs]);

    if (loading) {
        return <div className="text-center py-10">Loading FAQs...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-600">{error}</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Question
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Answer
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {faqs.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                                No FAQs found.
                            </td>
                        </tr>
                    ) : (
                        faqs.map((faq) => (
                            <tr key={faq._id}>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">{faq.question}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-500 line-clamp-2">{faq.answer}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link
                                        to={`/admin/faq/edit/${faq._id}`}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4 inline-block"
                                    >
                                        <HiPencil className="w-5 h-5" />
                                    </Link>
                                    <button
                                        onClick={() => {
                                            if (window.confirm('Are you sure you want to delete this FAQ?')) {
                                                removeFaq(faq._id);
                                            }
                                        }}
                                        className="text-red-600 hover:text-red-900 inline-block"
                                    >
                                        <HiTrash className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
});

GetFAQ.displayName = 'GetFAQ';

export default GetFAQ;
