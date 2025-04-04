// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { ArrowLeft } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';

// // Import the action and static data
// import { advancedSearchCandidates } from '../operations/recruiterAPI';
// import RecruiterHeader from './profiles/RecruiterDashboard/RecruiterHeader';

// // Static data - consider moving to a separate constants file
// const departments = [
//   'Engineering', 
//   'Marketing', 
//   'Sales', 
//   'Human Resources', 
//   'Finance', 
//   'Customer Support'
// ];

// const industries = [
//   'Technology', 
//   'Finance', 
//   'Healthcare', 
//   'Education', 
//   'Manufacturing', 
//   'Retail'
// ];

// const noticePeriods = [
//   'Immediate', 
//   '15 Days', 
//   '30 Days', 
//   '45 Days', 
//   '60 Days'
// ];

// const qualifications = [
//   'Bachelor of Technology', 
//   'Bachelor of Science', 
//   'Bachelor of Arts', 
//   'Master of Technology', 
//   'Master of Science', 
//   'Master of Arts'
// ];

// const AdvancedSearch = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { token } = useSelector((state) => state.recruiter);
//   const { searchResults, searchTotal, searchLoading } = useSelector((state) => state.recruiter);

//   const [filters, setFilters] = useState({
//     keywords: [],
//     experienceFrom: '',
//     experienceTo: '',
//     currentLocation: '',
//     isRelocatable: false,
//     salaryFrom: '',
//     salaryTo: '',
//     department: '',
//     role: '',
//     industry: '',
//     companyName: '',
//     designation: '',
//     noticePeriod: '',
//     ugQualification: '',
//     pgQualification: '',
//     gender: '',
//     displayDetails: 'all',
//     verifiedNumber: false,
//     verifiedEmail: false,
//     attachedResume: false,
//     ageFrom: '',
//     ageTo: '',
//     page: 1,
//     limit: 10
//   });

//   const [keywordInput, setKeywordInput] = useState('');

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFilters(prevFilters => ({
//       ...prevFilters,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleKeywordAdd = (e) => {
//     if (e.key === 'Enter' && keywordInput.trim()) {
//       setFilters(prevFilters => ({
//         ...prevFilters,
//         keywords: [...prevFilters.keywords, keywordInput.trim()]
//       }));
//       setKeywordInput('');
//     }
//   };

//   const removeKeyword = (index) => {
//     setFilters(prevFilters => ({
//       ...prevFilters,
//       keywords: prevFilters.keywords.filter((_, i) => i !== index)
//     }));
//   };

//   const handleSearch = async () => {
//     // Validate that at least keywords are provided
//     if (filters.keywords.length === 0) {
//       toast.error('Please add at least one keyword');
//       return;
//     }

//     try {
//       // Remove the page and limit from the search payload
//       const { page, limit, ...searchPayload } = filters;

//       // Dispatch the advanced search action
//       await dispatch(advancedSearchCandidates(token, {
//         ...searchPayload,
//         page,
//         limit
//       }));

//       // Navigate to search results page
//       navigate('/components/profiles/SearchResults');
//     } catch (error) {
//       console.error('Search failed:', error);
//       toast.error('Failed to perform search. Please try again.');
//     }
//   };

//   const resetFilters = () => {
//     setFilters({
//       keywords: [],
//       experienceFrom: '',
//       experienceTo: '',
//       currentLocation: '',
//       isRelocatable: false,
//       salaryFrom: '',
//       salaryTo: '',
//       department: '',
//       role: '',
//       industry: '',
//       companyName: '',
//       designation: '',
//       noticePeriod: '',
//       ugQualification: '',
//       pgQualification: '',
//       gender: '',
//       displayDetails: 'all',
//       verifiedNumber: false,
//       verifiedEmail: false,
//       attachedResume: false,
//       ageFrom: '',
//       ageTo: '',
//       page: 1,
//       limit: 10
//     });
//     setKeywordInput('');
//   };

//   return (
//     <>
//       <RecruiterHeader />
      
//       <div className="back h-9 w-9 left-[23%] relative top-24">
//         <Link to="/components/profiles/RecruiterDashboard/Dashboard" className="mr-4">
//           <ArrowLeft className="h-full w-full'" />
//         </Link>
        
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-5xl mx-auto relative top-28">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Keywords Section */}
//           <div className="col-span-full">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Keywords (Skills)
//             </label>
//             <input
//               type="text"
//               placeholder="Type skill and press Enter"
//               className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               value={keywordInput}
//               onChange={(e) => setKeywordInput(e.target.value)}
//               onKeyDown={handleKeywordAdd}
//             />
//             <div className="flex flex-wrap gap-2 mt-2">
//               {filters.keywords.map((keyword, index) => (
//                 <div 
//                   key={index} 
//                   className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
//                 >
//                   {keyword}
//                   <button 
//                     onClick={() => removeKeyword(index)}
//                     className="ml-2 text-blue-600 hover:text-blue-800"
//                   >
//                     &times;
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <p className="text-xs text-gray-500 mt-1">Required for search</p>
//           </div>

//           {/* Experience Range */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Experience (in years)</label>
//             <div className="grid grid-cols-2 gap-2">
//               <input
//                 type="number"
//                 name="experienceFrom"
//                 placeholder="From"
//                 min="0"
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 value={filters.experienceFrom}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="number"
//                 name="experienceTo"
//                 placeholder="To"
//                 min="0"
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 value={filters.experienceTo}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>

//           {/* Current Location */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Current Location</label>
//             <input
//               type="text"
//               name="currentLocation"
//               placeholder="City, State, Country"
//               className="w-full p-2 border border-gray-300 rounded-md"
//               value={filters.currentLocation}
//               onChange={handleInputChange}
//             />
//             <div className="mt-2">
//               <label className="inline-flex items-center">
//                 <input
//                   type="checkbox"
//                   name="isRelocatable"
//                   className="h-4 w-4 text-blue-600 border-gray-300 rounded"
//                   checked={filters.isRelocatable}
//                   onChange={handleInputChange}
//                 />
//                 <span className="ml-2 text-sm text-gray-600">Willing to relocate</span>
//               </label>
//             </div>
//           </div>

//           {/* Salary Range */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Annual Salary</label>
//             <div className="grid grid-cols-2 gap-2">
//               <input
//                 type="number"
//                 name="salaryFrom"
//                 placeholder="From"
//                 min="0"
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 value={filters.salaryFrom}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="number"
//                 name="salaryTo"
//                 placeholder="To"
//                 min="0"
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 value={filters.salaryTo}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>

//           {/* Department */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
//             <select
//               name="department"
//               className="w-full p-2 border border-gray-300 rounded-md"
//               value={filters.department}
//               onChange={handleInputChange}
//             >
//               <option value="">Select Department</option>
//               {departments.map((dept) => (
//                 <option key={dept} value={dept}>{dept}</option>
//               ))}
//             </select>
//           </div>

//           {/* Role */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
//             <input
//               type="text"
//               name="role"
//               placeholder="Job Role"
//               className="w-full p-2 border border-gray-300 rounded-md"
//               value={filters.role}
//               onChange={handleInputChange}
//             />
//           </div>

//           {/* Industry */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
//             <select
//               name="industry"
//               className="w-full p-2 border border-gray-300 rounded-md"
//               value={filters.industry}
//               onChange={handleInputChange}
//             >
//               <option value="">Select Industry</option>
//               {industries.map((ind) => (
//                 <option key={ind} value={ind}>{ind}</option>
//               ))}
//             </select>
//           </div>

//           {/* Company Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
//             <input
//               type="text"
//               name="companyName"
//               placeholder="Current or Past Company"
//               className="w-full p-2 border border-gray-300 rounded-md"
//               value={filters.companyName}
//               onChange={handleInputChange}
//             />
//           </div>

//           {/* Designation */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
//             <input
//               type="text"
//               name="designation"
//               placeholder="Current Designation"
//               className="w-full p-2 border border-gray-300 rounded-md"
//               value={filters.designation}
//               onChange={handleInputChange}
//             />
//           </div>

//           {/* Notice Period */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Notice Period</label>
//             <select
//               name="noticePeriod"
//               className="w-full p-2 border border-gray-300 rounded-md"
//               value={filters.noticePeriod}
//               onChange={handleInputChange}
//             >
//               <option value="">Select Notice Period</option>
//               {noticePeriods.map((period) => (
//                 <option key={period} value={period}>{period}</option>
//               ))}
//             </select>
//           </div>

//           {/* UG Qualification */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">UG Qualification</label>
//             <select
//               name="ugQualification"
//               className="w-full p-2 border border-gray-300 rounded-md"
//               value={filters.ugQualification}
//               onChange={handleInputChange}
//             >
//               <option value="">Select UG Qualification</option>
//               {qualifications.map((qual) => (
//                 <option key={qual} value={qual}>{qual}</option>
//               ))}
//             </select>
//           </div>

//           {/* PG Qualification */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">PG Qualification</label>
//             <select
//               name="pgQualification"
//               className="w-full p-2 border border-gray-300 rounded-md"
//               value={filters.pgQualification}
//               onChange={handleInputChange}
//             >
//               <option value="">Select PG Qualification</option>
//               {qualifications.map((qual) => (
//                 <option key={qual} value={qual}>{qual}</option>
//               ))}
//             </select>
//           </div>

//           {/* Gender */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
//             <select
//               name="gender"
//               className="w-full p-2 border border-gray-300 rounded-md"
//               value={filters.gender}
//               onChange={handleInputChange}
//             >
//               <option value="">All Genders</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>

//           {/* Age Range */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Candidate Age</label>
//             <div className="grid grid-cols-2 gap-2">
//               <input
//                 type="number"
//                 name="ageFrom"
//                 placeholder="From"
//                 min="18"
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 value={filters.ageFrom}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="number"
//                 name="ageTo"
//                 placeholder="To"
//                 min="18"
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 value={filters.ageTo}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>

//           {/* Display Options */}
//           <div className="col-span-full">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Display Details</label>
//             <div className="flex space-x-4">
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   name="displayDetails"
//                   value="all"
//                   className="h-4 w-4 text-blue-600 border-gray-300"
//                   checked={filters.displayDetails === 'all'}
//                   onChange={handleInputChange}
//                 />
//                 <span className="ml-2 text-sm text-gray-600">All Candidates</span>
//               </label>
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   name="displayDetails"
//                   value="new"
//                   className="h-4 w-4 text-blue-600 border-gray-300"
//                   checked={filters.displayDetails === 'new'}
//                   onChange={handleInputChange}
//                 />
//                 <span className="ml-2 text-sm text-gray-600">New Registered</span>
//               </label>
//             </div>
//           </div>

//           {/* Verification Options */}
//           <div className="col-span-full">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Show Only Candidates With</label>
//             <div className="flex flex-wrap gap-4">
//               <label className="inline-flex items-center">
//                 <input
//                   type="checkbox"
//                   name="verifiedNumber"
//                   className="h-4 w-4 text-blue-600 border-gray-300 rounded"
//                   checked={filters.verifiedNumber}
//                   onChange={handleInputChange}
//                 />
//                 <span className="ml-2 text-sm text-gray-600">Verified Number</span>
//               </label>
//               <label className="inline-flex items-center">
//                 <input
//                   type="checkbox"
//                   name="verifiedEmail"
//                   className="h-4 w-4 text-blue-600 border-gray-300 rounded"
//                   checked={filters.verifiedEmail}
//                   onChange={handleInputChange}
//                 />
//                 <span className="ml-2 text-sm text-gray-600">Verified Email ID</span>
//               </label>
//               <label className="inline-flex items-center">
//                 <input
//                   type="checkbox"
//                   name="attachedResume"
//                   className="h-4 w-4 text-blue-600 border-gray-300 rounded"
//                   checked={filters.attachedResume}
//                   onChange={handleInputChange}
//                 />
//                 <span className="ml-2 text-sm text-gray-600">Attached Resume</span>
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="mt-6 flex justify-end space-x-3">
//           <button 
//             type="button" 
//             className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
//             onClick={resetFilters}
//           >
//             Reset
//           </button>
//           <button 
//             type="button" 
//             className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             onClick={handleSearch}
//             disabled={filters.keywords.length === 0 || searchLoading}
//           >
//             {searchLoading ? 'Searching...' : 'Search Candidates'}
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdvancedSearch;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Import the action and static data
import { advancedSearchCandidates } from '../operations/recruiterAPI';
import RecruiterHeader from './profiles/RecruiterDashboard/RecruiterHeader';

// Static data - consider moving to a separate constants file
const departments = [
  'Engineering', 
  'Marketing', 
  'Sales', 
  'Human Resources', 
  'Finance', 
  'Customer Support'
];

const industries = [
  'Technology', 
  'Finance', 
  'Healthcare', 
  'Education', 
  'Manufacturing', 
  'Retail'
];

const noticePeriods = [
  'Immediate', 
  '15 Days', 
  '30 Days', 
  '45 Days', 
  '60 Days'
];

const qualifications = [
  'Bachelor of Technology', 
  'Bachelor of Science', 
  'Bachelor of Arts', 
  'Master of Technology', 
  'Master of Science', 
  'Master of Arts'
];

const AdvancedSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state?.recruiter);
  const { searchResults, searchTotal, searchLoading } = useSelector((state) => state.recruiter);

  const [filters, setFilters] = useState({
    keywords: [],
    experienceFrom: '',
    experienceTo: '',
    currentLocation: '',
    isRelocatable: true,
    salaryFrom: '',
    salaryTo: '',
    department: '',
    role: '',
    industry: '',
    companyName: '',
    designation: '',
    noticePeriod: '',
    ugQualification: '',
    pgQualification: '',
    gender: '',
    displayDetails: 'all',
    verifiedNumber: false,
    verifiedEmail: false,
    attachedResume: false,
    ageFrom: '',
    ageTo: '',
    page: 1,
    limit: 10
  });

  const [keywordInput, setKeywordInput] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleKeywordAdd = (e) => {
    if (e.key === 'Enter' && keywordInput.trim()) {
      setFilters(prevFilters => ({
        ...prevFilters,
        keywords: [...prevFilters.keywords, keywordInput.trim()]
      }));
      setKeywordInput('');
    }
  };

  const removeKeyword = (index) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      keywords: prevFilters.keywords.filter((_, i) => i !== index)
    }));
  };

  const handleSearch = async () => {
    // Check if at least one filter is filled to prevent empty searches
    const hasAtLeastOneFilter = Object.entries(filters).some(([key, value]) => {
      if (key === 'keywords') return value.length > 0;
      if (key === 'page' || key === 'limit') return false; // Ignore pagination
      if (typeof value === 'boolean') return value === true;
      if (typeof value === 'string') return value.trim() !== '';
      return value !== null && value !== undefined;
    });

    if (!hasAtLeastOneFilter) {
      toast.error('Please provide at least one search criteria');
      return;
    }

    try {
      // Remove the page and limit from the search payload
      const { page, limit, ...searchPayload } = filters;

      // Dispatch the advanced search action
      await dispatch(advancedSearchCandidates(token, {
        ...searchPayload,
        page,
        limit
      }));

      // Navigate to search results page
      navigate('/components/profiles/SearchResults');
    } catch (error) {
      console.error('Search failed:', error);
      toast.error('Failed to perform search. Please try again.');
    }
  };

  const resetFilters = () => {
    setFilters({
      keywords: [],
      experienceFrom: '',
      experienceTo: '',
      currentLocation: '',
      isRelocatable: false,
      salaryFrom: '',
      salaryTo: '',
      department: '',
      role: '',
      industry: '',
      companyName: '',
      designation: '',
      noticePeriod: '',
      ugQualification: '',
      pgQualification: '',
      gender: '',
      displayDetails: 'all',
      verifiedNumber: false,
      verifiedEmail: false,
      attachedResume: false,
      ageFrom: '',
      ageTo: '',
      page: 1,
      limit: 10
    });
    setKeywordInput('');
  };

  return (
    <>
      <RecruiterHeader />
      
      <div className="back h-9 w-9 left-[23%] relative top-24">
        <Link to="/components/profiles/RecruiterDashboard/Dashboard" className="mr-4">
          <ArrowLeft className="h-full w-full'" />
        </Link>
        
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-5xl mx-auto relative top-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Keywords Section */}
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Keywords (Skills)
            </label>
            <input
              type="text"
              placeholder="Type skill and press Enter"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={handleKeywordAdd}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {filters.keywords.map((keyword, index) => (
                <div 
                  key={index} 
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                >
                  {keyword}
                  <button 
                    onClick={() => removeKeyword(index)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">Optional - add relevant skills to refine search</p>
          </div>

          {/* Experience Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience (in years)</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                name="experienceFrom"
                placeholder="From"
                min="0"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={filters.experienceFrom}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="experienceTo"
                placeholder="To"
                min="0"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={filters.experienceTo}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Current Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Location</label>
            <input
              type="text"
              name="currentLocation"
              placeholder="City, State, Country"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={filters.currentLocation}
              onChange={handleInputChange}
            />
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="isRelocatable"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  checked={filters.isRelocatable}
                  onChange={handleInputChange}
                />
                <span className="ml-2 text-sm text-gray-600">Willing to relocate</span>
              </label>
            </div>
          </div>

          {/* Salary Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Salary</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                name="salaryFrom"
                placeholder="From"
                min="0"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={filters.salaryFrom}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="salaryTo"
                placeholder="To"
                min="0"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={filters.salaryTo}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              name="department"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={filters.department}
              onChange={handleInputChange}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input
              type="text"
              name="role"
              placeholder="Job Role"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={filters.role}
              onChange={handleInputChange}
            />
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <select
              name="industry"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={filters.industry}
              onChange={handleInputChange}
            >
              <option value="">Select Industry</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              type="text"
              name="companyName"
              placeholder="Current or Past Company"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={filters.companyName}
              onChange={handleInputChange}
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
            <input
              type="text"
              name="designation"
              placeholder="Current Designation"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={filters.designation}
              onChange={handleInputChange}
            />
          </div>

          {/* Notice Period */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notice Period</label>
            <select
              name="noticePeriod"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={filters.noticePeriod}
              onChange={handleInputChange}
            >
              <option value="">Select Notice Period</option>
              {noticePeriods.map((period) => (
                <option key={period} value={period}>{period}</option>
              ))}
            </select>
          </div>

          {/* UG Qualification */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">UG Qualification</label>
            <select
              name="ugQualification"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={filters.ugQualification}
              onChange={handleInputChange}
            >
              <option value="">Select UG Qualification</option>
              {qualifications.map((qual) => (
                <option key={qual} value={qual}>{qual}</option>
              ))}
            </select>
          </div>

          {/* PG Qualification */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PG Qualification</label>
            <select
              name="pgQualification"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={filters.pgQualification}
              onChange={handleInputChange}
            >
              <option value="">Select PG Qualification</option>
              {qualifications.map((qual) => (
                <option key={qual} value={qual}>{qual}</option>
              ))}
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={filters.gender}
              onChange={handleInputChange}
            >
              <option value="">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Age Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Candidate Age</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                name="ageFrom"
                placeholder="From"
                min="18"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={filters.ageFrom}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="ageTo"
                placeholder="To"
                min="18"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={filters.ageTo}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Display Options */}
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">Display Details</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="displayDetails"
                  value="all"
                  className="h-4 w-4 text-blue-600 border-gray-300"
                  checked={filters.displayDetails === 'all'}
                  onChange={handleInputChange}
                />
                <span className="ml-2 text-sm text-gray-600">All Candidates</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="displayDetails"
                  value="new"
                  className="h-4 w-4 text-blue-600 border-gray-300"
                  checked={filters.displayDetails === 'new'}
                  onChange={handleInputChange}
                />
                <span className="ml-2 text-sm text-gray-600">New Registered</span>
              </label>
            </div>
          </div>

          {/* Verification Options */}
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">Show Only Candidates With</label>
            <div className="flex flex-wrap gap-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="verifiedNumber"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  checked={filters.verifiedNumber}
                  onChange={handleInputChange}
                />
                <span className="ml-2 text-sm text-gray-600">Verified Number</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="verifiedEmail"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  checked={filters.verifiedEmail}
                  onChange={handleInputChange}
                />
                <span className="ml-2 text-sm text-gray-600">Verified Email ID</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="attachedResume"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  checked={filters.attachedResume}
                  onChange={handleInputChange}
                />
                <span className="ml-2 text-sm text-gray-600">Attached Resume</span>
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          <button 
            type="button" 
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            onClick={resetFilters}
          >
            Reset
          </button>
          <button 
            type="button" 
            className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={handleSearch}
            disabled={searchLoading}
          >
            {searchLoading ? 'Searching...' : 'Search Candidates'}
          </button>
        </div>
      </div>
    </>
  );
};

export default AdvancedSearch;