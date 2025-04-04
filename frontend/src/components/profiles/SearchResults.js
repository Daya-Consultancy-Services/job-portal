import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import RecruiterHeader from './RecruiterDashboard/RecruiterHeader';
import { ArrowLeft, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchResults = () => {
  const  searchResults  = useSelector((state) => state.user.results);
  const [expandedCompanies, setExpandedCompanies] = useState({});
  
  const companies = searchResults?.companies || [];
  const jobs = searchResults?.jobs || [];
  
  // Create a map of jobs by companyId for easy lookup
  const jobsByCompany = {};
  jobs.forEach(job => {
    const companyId = job.companyId?._id || job.companyId;
    if (!jobsByCompany[companyId]) {
      jobsByCompany[companyId] = [];
    }
    jobsByCompany[companyId].push(job);
  });
 
  const toggleCompanyExpand = (companyId) => {
    setExpandedCompanies(prev => ({
      ...prev,
      [companyId]: !prev[companyId]
    }));
  };

  const renderCompanyCard = (company) => {
    const companyJobs = jobsByCompany[company._id] || [];
    const isExpanded = expandedCompanies[company._id] || false;
    
    return (
      <div 
        key={company._id} 
        className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-4"
      >
        <div className="flex justify-between items-start">
          <div className="flex-grow">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {company.name || 'N/A'}
              </h3>
              <span className="text-sm text-gray-500">
                {company.location || 'Location N/A'}
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <p>{company.description || 'No description available'}</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {company.companyfield && company.companyfield.map((field, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  {field}
                </span>
              ))}
            </div>
          </div>
          <button 
            onClick={() => toggleCompanyExpand(company._id)}
            className="ml-4 p-1 rounded-full hover:bg-gray-100"
          >
            {isExpanded ? 
              <ChevronUp className="h-5 w-5 text-gray-500" /> : 
              <ChevronDown className="h-5 w-5 text-gray-500" />
            }
          </button>
        </div>
        
        {/* Jobs section */}
        {isExpanded && (
          <div className="mt-4 border-t pt-4">
            <h4 className="text-md font-medium mb-3">Available Jobs ({companyJobs.length})</h4>
            {companyJobs.length > 0 ? (
              <div className="space-y-3">
                {companyJobs.map(job => (
                  <div key={job._id} className="bg-gray-50 p-3 rounded border border-gray-200">
                    <div className="flex justify-between">
                      <h5 className="font-medium">{job.jobTitle}</h5>
                      <span className="text-sm text-green-600">
                        {job.salary ? `₹${job.salary.toLocaleString()}` : 'Salary not specified'}
                      </span>
                    </div>
                    <p className="text-sm mt-1 text-gray-600">{job.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {job.skillRequired && job.skillRequired.map((skill, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No jobs available at this company.</p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <RecruiterHeader />
      <div className="container mx-auto px-4 py-8 relative top-24">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Link to="/components/profiles/AdvancedSearch">
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </Link>
            <h2 className="text-2xl font-bold text-gray-800">
              Companies & Jobs ({companies.length} Companies, {jobs.length} Jobs)
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              Refine Search
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {companies.length > 0 ? (
            companies.map(renderCompanyCard)
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No companies found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResults;