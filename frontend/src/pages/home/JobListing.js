import React from 'react';
import { Building2, MapPin, Briefcase, BanknoteIcon, Send } from 'lucide-react';

const JobCard = ({ job }) => {
  const defaultImage = "/api/placeholder/80/80";

  const handleApply = () => {
    // Handle apply logic here
    console.log('Applying for job:', job._id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <img
          src={job.companyId.logo || defaultImage}
          alt={job.companyId.name}
          className="w-20 h-20 object-cover rounded-lg border border-black"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">{job.jobTitle}</h3>
          <div className="flex items-center gap-2 mt-2">
            <Building2 className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">{job.companyId.name}</span>
          </div>
         
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">{job.jobLocation}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">{job.jobType}</span>
            </div>
            <div className="flex items-center gap-2">
              <BanknoteIcon className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">₹{job.salaryRange}</span>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Required Skills:</h4>
            <div className="flex flex-wrap gap-2">
              {job.skillRequired.filter(skill => skill).map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-gray-600 line-clamp-3">{job.description}</p>
          </div>

          <div className="mt-4 flex gap-3">
            <button 
              onClick={handleApply}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Apply Now
            </button>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobListings = ({ jobs }) => {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500 text-lg">No jobs available at the moment</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
};

export default JobListings;