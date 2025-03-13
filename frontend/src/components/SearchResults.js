import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clearSearchResults } from '../slices/userSlice';

function SearchResults() {
    const { results, loading } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    console.log("results",results, );

    // Extract search query from URL
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('query') || '';

    useEffect(() => {
        // Clean up when component unmounts
        return () => {
            dispatch(clearSearchResults());
        };
    }, [dispatch]);

    if (loading) {
        return (
            <div className="min-h-screen pt-24 px-8 bg-gray-50">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-semibold mb-8">Searching...</h1>
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    </div>
                </div>
            </div>
        );
    }

    const { companies = [], jobs = [] } = results || {};
    const hasResults = companies.length > 0 || jobs.length > 0;

    return (
        <div className="min-h-screen pt-24 px-8 bg-gray-50">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-semibold">
                        {searchQuery ? `Search results for "${searchQuery}"` : 'Search Results'}
                    </h1>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Back
                    </button>
                </div>

                {!hasResults && (
                    <div className="text-center py-10">
                        <h3 className="text-xl text-gray-700">No results found</h3>
                        <p className="text-gray-500 mt-2">Try searching with different keywords</p>
                    </div>
                )}

                {companies.length > 0 && (
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold mb-4">Companies ({companies.length})</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {companies.map(company => (
                                <div key={company._id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                                    <div className="flex items-center mb-4">
                                        <div className="w-16 h-16 mr-4 rounded-full overflow-hidden border">
                                            <img 
                                                src={company.logo || require("../assets/default-profile.jpg")} 
                                                alt={company.name} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold">{company.name}</h3>
                                            <p className="text-gray-600">{company.companyfield}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 line-clamp-2 mb-4">{company.description}</p>
                                    <div className="text-gray-600 mb-3">
                                        <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                        {company.location}
                                    </div>
                                    <Link 
                                        to={`/company/${company._id}`} 
                                        className="block text-center py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                    >
                                        View Profile
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {jobs.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Jobs ({jobs.length})</h2>
                        <div className="space-y-4">
                            {jobs.map(job => (
                                <div key={job._id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                                        <div className="mb-4 md:mb-0">
                                            <h3 className="text-lg font-semibold">{job.jobTitle}</h3>
                                            <Link to={`/company/${job.companyId?._id}`} className="text-blue-600 hover:underline">
                                                {job.companyId?.name}
                                            </Link>
                                            <p className="text-gray-600 mt-1">{job.jobLocation}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                                            {job.skillRequired.map((skill, index) => (
                                                <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                        <Link 
                                            to={`/job/${job._id}`} 
                                            className="block text-center py-2 px-6 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                        >
                                            View Job
                                        </Link>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-gray-700 line-clamp-2">{job.description}</p>
                                    </div>
                                    <div className="mt-4 flex flex-wrap items-center text-sm text-gray-600 gap-x-4">
                                        <span>{job.jobType}</span>
                                        <span>•</span>
                                        <span>{job.salaryRange}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchResults;