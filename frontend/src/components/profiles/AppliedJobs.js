import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Building2, Calendar, MapPin, Clock, Briefcase, BadgeDollarSign } from 'lucide-react';
import { fetchallappliedJob } from '../../operations/userAPI';
import HomeHeader from '../../pages/home/Header';

const AppliedJobs = () => {
  const appliedJobs = useSelector((state) => state.user.appliedJobs);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchallappliedJob(token));
  }, [dispatch, token]);

  const getStatusColor = (status) => {
    const statusColors = {
      "Under Review": "bg-yellow-100 text-yellow-800",
      "Interview Scheduled": "bg-green-100 text-green-800",
      "Rejected": "bg-red-100 text-red-800",
      "Offer Received": "bg-blue-100 text-blue-800",
      "Pending": "bg-gray-100 text-gray-800"
    };
    return statusColors[status] || statusColors["Pending"];
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const JobDetailItem = ({ icon: Icon, children }) => (
    <div className="flex items-center gap-2 text-gray-600">
      <Icon className="w-4 h-4" />
      <span>{children}</span>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 bg-gray-50">
      <HomeHeader />
        <main className="container mx-auto px-4 py-24">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Applied Jobs</h1>
            <p className="text-gray-600 mt-2">Track all your job applications in one place</p>
          </div>
          
          <div className="space-y-4">
            {appliedJobs.map((job) => (
              <div 
                key={job._id} 
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {job.jobTitle}
                      </h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
                        {job.status || "Pending"}
                      </span>
                    </div>

                    <div className="mt-4 space-y-3">
                      <JobDetailItem icon={Building2}>
                        {job.companyId?.name || "Company Name"}
                      </JobDetailItem>
                      
                      <JobDetailItem icon={MapPin}>
                        {job.jobLocation}
                      </JobDetailItem>
                      
                      <JobDetailItem icon={Briefcase}>
                        {job.jobType}
                      </JobDetailItem>
                      
                      <JobDetailItem icon={BadgeDollarSign}>
                        {job.salaryRange}
                      </JobDetailItem>
                    </div>

                    {job.skillRequired?.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Required Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {job.skillRequired.map((skill, index) => (
                            <span 
                              key={index} 
                              className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="md:text-right">
                    <JobDetailItem icon={Calendar}>
                      Applied: {formatDate(job.createdAt || new Date())}
                    </JobDetailItem>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppliedJobs;