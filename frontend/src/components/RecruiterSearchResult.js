

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { clearSearchResults } from '../slices/recruiterSlice';

// function RecruiterSearchResult() {
//     const { 
//         searchResults, 
//         searchLoading, 
//         searchTotal, 
//         searchPage, 
//         searchLimit 
//     } = useSelector(state => state.recruiter);
    
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Clean up when component unmounts
//         return () => {
//             dispatch(clearSearchResults());
//         };
//     }, [dispatch]);

//     if (searchLoading) {
//         return (
//             <div className="min-h-screen pt-24 px-8 bg-gray-50">
//                 <div className="container mx-auto">
//                     <h1 className="text-2xl font-semibold mb-8">Searching Candidates...</h1>
//                     <div className="flex justify-center">
//                         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     const hasResults = searchResults.length > 0;

//     return (
//         <div className="min-h-screen pt-24 px-8 bg-gray-50">
//             <div className="container mx-auto">
//                 <div className="flex justify-between items-center mb-8">
//                     <h1 className="text-2xl font-semibold">
//                         Candidate Search Results 
//                         <span className="ml-4 text-gray-600 text-base">({searchTotal} candidates)</span>
//                     </h1>
//                     <button 
//                         onClick={() => navigate(-1)} 
//                         className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//                     >
//                         Back
//                     </button>
//                 </div>

//                 {!hasResults && (
//                     <div className="text-center py-10">
//                         <h3 className="text-xl text-gray-700">No candidates found</h3>
//                         <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
//                     </div>
//                 )}

//                 {hasResults && (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {searchResults.map(candidate => (
//                             <div 
//                                 key={candidate.candidateId} 
//                                 className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
//                             >
//                                 <div className="flex items-center mb-4">
//                                     <div className="w-16 h-16 mr-4 rounded-full overflow-hidden border">
//                                         <img 
//                                             src={candidate.profilePicture || require("../assets/default-profile.jpg")} 
//                                             alt={candidate.fullName} 
//                                             className="w-full h-full object-cover"
//                                         />
//                                     </div>
//                                     <div>
//                                         <h3 className="text-lg font-semibold">{candidate.fullName}</h3>
//                                         <p className="text-gray-600">{candidate.currentJobTitle}</p>
//                                     </div>
//                                 </div>

//                                 <div className="space-y-2 text-sm text-gray-700">
//                                     <p>
//                                         <span className="font-medium">Company:</span> {candidate.currentCompany || 'N/A'}
//                                     </p>
//                                     <p>
//                                         <span className="font-medium">Experience:</span> {candidate.experience} years
//                                     </p>
//                                     <p>
//                                         <span className="font-medium">Skills:</span> {candidate.skills?.join(', ') || 'No skills listed'}
//                                     </p>
//                                     <p>
//                                         <span className="font-medium">Education:</span> {candidate.education?.degree} from {candidate.education?.institution}
//                                     </p>
//                                     <p>
//                                         <span className="font-medium">Location:</span> {candidate.location}
//                                     </p>
//                                 </div>

//                                 <div className="mt-4 flex justify-between items-center">
//                                     <span className="text-sm text-gray-500">
//                                         {candidate.verificationStatus?.resumeAttached ? 'Resume Attached' : 'No Resume'}
//                                     </span>
//                                     <button 
//                                         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//                                         onClick={() => {
//                                             // TODO: Implement view candidate details functionality
//                                             console.log('View Candidate Details', candidate);
//                                         }}
//                                     >
//                                         View Details
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}

//                 {hasResults && (
//                     <div className="mt-8 flex justify-center items-center space-x-4">
//                         <span>Page {searchPage} of {Math.ceil(searchTotal / searchLimit)}</span>
//                         {/* TODO: Implement pagination controls */}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default RecruiterSearchResult;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearSearchResults } from '../slices/recruiterSlice';

function RecruiterSearchResult() {
    // Get search data from the Redux store (already mapped by setSearchResults)
    const { 
        searchResults, 
        searchLoading, 
        searchTotal, 
        searchPage, 
        searchLimit 
    } = useSelector(state => state.recruiter);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const filteredCandidate = useSelector(state => state.recruiter.searchResults);
   
    

    // Handle pagination
    const handlePageChange = (newPage) => {
        // You would implement a new search action here with the updated page
        console.log("Navigate to page:", newPage);
        // searchCandidates({ ...currentSearchParams, page: newPage })
    };



    if (searchLoading) {
        return (
            <div className="min-h-screen pt-24 px-8 bg-gray-50">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-semibold mb-8">Searching Candidates...</h1>
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    </div>
                </div>
            </div>
        );
    }

    const hasResults = searchResults && searchResults.length > 0;
    const totalPages = Math.ceil(searchTotal / searchLimit);

    return (
        <div className="min-h-screen pt-24 px-8 bg-gray-50">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-semibold">
                        Candidate Search Results 
                        <span className="ml-4 text-gray-600 text-base">({searchTotal} candidates)</span>
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
                        <h3 className="text-xl text-gray-700">No candidates found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
                    </div>
                )}

                {hasResults && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCandidate.map(candidate => (
                            <div 
                                key={candidate._id} 
                                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-16 h-16 mr-4 rounded-full overflow-hidden border bg-gray-100">
                                        {candidate.profile?.image ? (
                                            <img 
                                                src={candidate.profile.image} 
                                                alt={`${candidate.firstName} ${candidate.lastName}`} 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-500 text-xl font-semibold">
                                                {candidate.firstName.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">{candidate.firstName} {candidate.lastName}</h3>
                                        <p className="text-gray-600">{candidate.workstatus || 'Not specified'}</p>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm text-gray-700">
                                    <p>
                                        <span className="font-medium">Email:</span> {candidate.email}
                                    </p>
                                    <p>
                                        <span className="font-medium">Work Status:</span> {candidate.workstatus || 'Not specified'}
                                    </p>
                                    <div>
                                        <span className="font-medium">Skills:</span> 
                                        <div className="mt-1 flex flex-wrap gap-1">
                                            {candidate.profile?.skillsProfile && candidate.profile.skillsProfile.length > 0 ? (
                                                candidate.profile.skillsProfile.map((skill, index) => (
                                                    <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                                                        {skill.skillName} ({skill.experience} {parseInt(skill.experience) === 1 ? 'year' : 'years'})
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-gray-500">No skills listed</span>
                                            )}
                                        </div>
                                    </div>
                                    <p>
                                        <span className="font-medium">Location:</span> {candidate.profile?.location || 'Not specified'}
                                    </p>
                                    
                                    {/* Education information */}
                                    {candidate.profile?.educationProfile && candidate.profile.educationProfile.length > 0 && (
                                        <div>
                                            <span className="font-medium">Education:</span>
                                            <div className="mt-1">
                                                {candidate.profile.educationProfile.map((edu, index) => (
                                                    <p key={index} className="text-xs">
                                                        {edu.degree} from {edu.institutionName}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Employment information */}
                                    {candidate.profile?.employProfile && candidate.profile.employProfile.length > 0 && (
                                        <div>
                                            <span className="font-medium">Current Company:</span>
                                            <p className="mt-1">
                                                {candidate.profile.employProfile[0].companyName}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4 flex justify-between items-center">
                                    <span className={`text-sm ${candidate.profile?.certificates?.length > 0 ? 'text-green-500' : 'text-gray-500'}`}>
                                        {candidate.profile?.certificates?.length > 0 ? (
                                            <span className="flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                                Resume Available
                                            </span>
                                        ) : 'No Resume'}
                                    </span>
                                   
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {hasResults && totalPages > 1 && (
                    <div className="mt-8 flex justify-center items-center">
                        <nav className="inline-flex rounded-md shadow">
                            <button
                                onClick={() => handlePageChange(searchPage - 1)}
                                disabled={searchPage === 1}
                                className={`px-3 py-1 rounded-l-md border ${
                                    searchPage === 1 
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                        : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                Previous
                            </button>
                            
                            {[...Array(totalPages).keys()].map(index => {
                                const pageNumber = index + 1;
                                return (
                                    <button
                                        key={pageNumber}
                                        onClick={() => handlePageChange(pageNumber)}
                                        className={`px-3 py-1 border-t border-b ${
                                            searchPage === pageNumber
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            })}
                            
                            <button
                                onClick={() => handlePageChange(searchPage + 1)}
                                disabled={searchPage === totalPages}
                                className={`px-3 py-1 rounded-r-md border ${
                                    searchPage === totalPages 
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                        : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                Next
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RecruiterSearchResult;