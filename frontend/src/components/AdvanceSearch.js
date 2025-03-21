import React, { useState } from 'react';
import RecruiterHeader from './profiles/RecruiterDashboard/RecruiterHeader';
import { ArrowBigLeft, ArrowBigLeftIcon, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdvancedSearch = () => {
  const [filters, setFilters] = useState({
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
    ageTo: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleKeywordAdd = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      setFilters({
        ...filters,
        keywords: [...filters.keywords, e.target.value.trim()],
        keywordInput: ''
      });
      e.target.value = '';
    }
  };

  const removeKeyword = (index) => {
    const updatedKeywords = [...filters.keywords];
    updatedKeywords.splice(index, 1);
    setFilters({
      ...filters,
      keywords: updatedKeywords
    });
  };

  const industries = [
    'Software Product',
    'IT Service and Consulting',
    'E-commerce',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing'
  ];

  const departments = [
    'Engineering',
    'Marketing',
    'Sales',
    'Finance',
    'Human Resources',
    'Operations',
    'Research & Development'
  ];

  const noticePeriods = [
    'Immediate',
    '15 Days',
    '30 Days',
    '60 Days',
    '90 Days'
  ];

  const qualifications = [
    'High School',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Ph.D.',
    'MBA'
  ];

  return (
    <>
    <RecruiterHeader/>
    <div className="back h-9 w-9 relative top-24 left-[23%]">
        <Link to="/components/profiles/RecruiterDashboard/Dashboard">
        <ArrowLeft className='h-full w-full'/>
        </Link>
        
    </div>
 <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-5xl mx-auto relative top-25">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Advanced Search</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Keywords Section */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Keywords (Skills) <span className="text-red-500">*</span>
          </label>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Type skill and press Enter"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onKeyDown={handleKeywordAdd}
            />
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {filters.keywords.map((keyword, index) => (
              <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
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
          <p className="text-xs text-gray-500">Required for search</p>
        </div>
        
        {/* Experience Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Experience (in years)</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                type="number"
                name="experienceFrom"
                placeholder="From"
                min="0"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={filters.experienceFrom}
                onChange={handleInputChange}
              />
            </div>
            <div>
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
          <div className="mt-1">
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
        
        {/* Annual Salary Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Annual Salary</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                type="number"
                name="salaryFrom"
                placeholder="From"
                min="0"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={filters.salaryFrom}
                onChange={handleInputChange}
              />
            </div>
            <div>
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
        </div>
        
        {/* Department and Role */}
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
            {industries.map((industry) => (
              <option key={industry} value={industry}>{industry}</option>
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
        
        {/* Education Qualifications */}
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
            <div>
              <input
                type="number"
                name="ageFrom"
                placeholder="From"
                min="18"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={filters.ageFrom}
                onChange={handleInputChange}
              />
            </div>
            <div>
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
        </div>
        
        {/* Display Options */}
        <div className="col-span-2 mt-4">
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
        <div className="col-span-2">
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
          onClick={() => setFilters({
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
            ageTo: ''
          })}
        >
          Reset
        </button>
        <button 
          type="button" 
          className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={filters.keywords.length === 0}
        >
          Search Candidates
        </button>
      </div>
    </div>
    </>
   
  );
};

export default AdvancedSearch;