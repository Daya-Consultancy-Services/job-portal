// import React, { useState, useEffect } from 'react';
// import { Building2, MapPin, Briefcase, BanknoteIcon, Send, CheckCircle } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { applyJob, fetchallappliedJob } from '../../operations/userAPI';

// const JobCard = ({ job, onRemove }) => {
//   const defaultImage = "/api/placeholder/80/80";
//   const token = useSelector((state) => state.user.token);
//   const appliedJobs = useSelector((state) => state.user.appliedJobs);
//   const dispatch = useDispatch();
  
//   const [isApplied, setIsApplied] = useState(
//     appliedJobs.some(appliedJob => appliedJob._id === job._id)
//   );

//   console.log("job id",job._id);
//   const [isVisible, setIsVisible] = useState(true);

//   const handleApply = async () => {
//     try {
//       await dispatch(applyJob(token, job._id));
//       setIsApplied(true);
      
//       setTimeout(() => {
//         setIsVisible(false);
//         setTimeout(() => {
//           onRemove(job._id);
//         }, 300);
//       }, 5000);
//     } catch (error) {
//       console.error('Error applying for job:', error);
//     }
//   };

//   const { companyId, jobTitle, jobLocation, jobType, salaryRange, skillRequired, description } = job;

//   if (!isVisible) {
//     return null;
//   }

//   return (
//     <div className={`bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-all duration-300 ${
//       isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-4'
//     }`}>
//       <div className="flex items-start gap-4">
//         <img
//           src={companyId.logo || defaultImage}
//           alt={companyId.name}
//           className="w-20 h-20 object-cover rounded-lg border border-gray-200"
//         />
//         <div className="flex-1">
//           <h3 className="text-xl font-semibold text-gray-900">{jobTitle}</h3>
//           <div className="flex items-center gap-2 mt-2">
//             <Building2 className="w-4 h-4 text-gray-500" />
//             <span className="text-gray-600">{companyId.name}</span>
//           </div>
          
//           <div className="grid grid-cols-2 gap-4 mt-4">
//             <div className="flex items-center gap-2">
//               <MapPin className="w-4 h-4 text-gray-500" />
//               <span className="text-gray-600">{jobLocation}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Briefcase className="w-4 h-4 text-gray-500" />
//               <span className="text-gray-600">{jobType}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <BanknoteIcon className="w-4 h-4 text-gray-500" />
//               <span className="text-gray-600">₹{salaryRange}</span>
//             </div>
//           </div>
          
//           {skillRequired?.length > 0 && (
//             <div className="mt-4">
//               <h4 className="text-sm font-semibold text-gray-700 mb-2">Required Skills:</h4>
//               <div className="flex flex-wrap gap-2">
//                 {skillRequired.filter(Boolean).map((skill, index) => (
//                   <span
//                     key={index}
//                     className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
          
//           {description && (
//             <div className="mt-4">
//               <p className="text-gray-600 line-clamp-3">{description}</p>
//             </div>
//           )}
          
//           <div className="mt-4 flex gap-3">
//             {isApplied ? (
//               <button
//                 disabled
//                 className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 cursor-not-allowed"
//               >
//                 <CheckCircle className="w-4 h-4" />
//                 Applied
//               </button>
//             ) : (
//               <button
//                 onClick={handleApply}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
//               >
//                 <Send className="w-4 h-4" />
//                 Apply Now
//               </button>
//             )}
//             <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
//               View Details
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const JobListings = ({ jobs }) => {
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.user.token);
//   const appliedJobs = useSelector((state) => state.user.appliedJobs);
//   const [visibleJobs, setVisibleJobs] = useState([]);

//   useEffect(() => {
//     // Fetch applied jobs when component mounts
//     dispatch(fetchallappliedJob(token));
//   }, [dispatch, token]);

//   useEffect(() => {
//     // Update visible jobs when either jobs or appliedJobs change
//     if (jobs && appliedJobs) {
//       const filteredJobs = jobs.filter(job => 
//         !appliedJobs.some(appliedJob => appliedJob._id === job._id)
//       );
//       setVisibleJobs(filteredJobs);
//     }
//   }, [jobs, appliedJobs]);

//   const handleRemoveJob = (jobId) => {
//     setVisibleJobs(prev => prev.filter(job => job._id !== jobId));
//   };

//   if (!visibleJobs?.length) {
//     return (
//       <div className="flex justify-center items-center h-full">
//         <p className="text-gray-500 text-lg">No jobs available at the moment</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       {visibleJobs.map((job) => (
//         <JobCard 
//           key={job._id} 
//           job={job} 
//           onRemove={handleRemoveJob}
//         />
//       ))}
//     </div>
//   );
// };

// export default JobListings;

import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Briefcase, BanknoteIcon, Send, CheckCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { applyJob, fetchallappliedJob } from '../../operations/userAPI';

const JobCard = ({ job, onRemove, userRole }) => {
  const defaultImage = "/api/placeholder/80/80";
  const token = useSelector((state) => state.user.token);
  const appliedJobs = useSelector((state) => state.user.appliedJobs);
  const dispatch = useDispatch();
  
  const [isApplied, setIsApplied] = useState(
    appliedJobs.some(appliedJob => appliedJob._id === job._id)
  );

  console.log("job id", job._id);
  const [isVisible, setIsVisible] = useState(true);

  const handleApply = async () => {
    try {
      await dispatch(applyJob(token, job._id));
      setIsApplied(true);
      
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onRemove(job._id);
        }, 300);
      }, 5000);
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };

  const { companyId, jobTitle, jobLocation, jobType, salaryRange, skillRequired, description } = job;

  if (!isVisible) {
    return null;
  }

  // Determine if we should show apply buttons based on user role
  const showApplyButtons = userRole !== 'Recruiter' && userRole !== 'Company';

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-all duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-4'
    }`}>
      <div className="flex items-start gap-4">
        <img
          src={companyId.logo || defaultImage}
          alt={companyId.name}
          className="w-20 h-20 object-cover rounded-lg border border-gray-200"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">{jobTitle}</h3>
          <div className="flex items-center gap-2 mt-2">
            <Building2 className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">{companyId.name}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">{jobLocation}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">{jobType}</span>
            </div>
            <div className="flex items-center gap-2">
              <BanknoteIcon className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">₹{salaryRange}</span>
            </div>
          </div>
          
          {skillRequired?.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Required Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {skillRequired.filter(Boolean).map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {description && (
            <div className="mt-4">
              <p className="text-gray-600 line-clamp-3">{description}</p>
            </div>
          )}
          
          <div className="mt-4 flex gap-3">
            {showApplyButtons ? (
              <>
                {isApplied ? (
                  <button
                    disabled
                    className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 cursor-not-allowed"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Applied
                  </button>
                ) : (
                  <button
                    onClick={handleApply}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Apply Now
                  </button>
                )}
              </>
            ) : null}
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobListings = ({ jobs, userRole }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const appliedJobs = useSelector((state) => state.user.appliedJobs);
  const [visibleJobs, setVisibleJobs] = useState([]);


  useEffect(() => {
    // Fetch applied jobs when component mounts
    if (userRole !== 'Recruiter' && userRole !== 'Company') {
      dispatch(fetchallappliedJob(token));
    }
  }, [dispatch, token, userRole]);

  useEffect(() => {
    // Update visible jobs when either jobs or appliedJobs change
    if (jobs && appliedJobs && userRole !== 'Recruiter' && userRole !== 'Company') {
      const filteredJobs = jobs.filter(job => 
        !appliedJobs.some(appliedJob => appliedJob._id === job._id)
      );
      setVisibleJobs(filteredJobs);
    } else {
      // For recruiters and companies, show all jobs
      setVisibleJobs(jobs || []);
    }
  }, [jobs, appliedJobs, userRole]);

  const handleRemoveJob = (jobId) => {
    setVisibleJobs(prev => prev.filter(job => job._id !== jobId));
  };

  if (!visibleJobs?.length) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500 text-lg">No jobs available at the moment</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {visibleJobs.map((job) => (
        <JobCard 
          key={job._id} 
          job={job} 
          onRemove={handleRemoveJob}
          userRole={userRole}
        />
      ))}
    </div>
  );
};

export default JobListings;