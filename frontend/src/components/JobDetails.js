import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../services/apiConnector';
import { userPoint } from '../operations/apis';
import { Building2, MapPin, Briefcase, BanknoteIcon, Calendar, Users, ClipboardList, Send, CheckCircle } from 'lucide-react';
import { applyJob } from '../operations/userAPI';
import HomeHeader from '../pages/home/Header';

const JobDetails = () => {
  const { jobId } = useParams();

//   console.log(jobId);
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
 
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const defaultImage = "/api/placeholder/120/120";


  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!jobId) {
        setError("No job ID provided");
        setLoading(false);
        return;
      }

      try {
        const response = await apiConnector(
          "GET",
          `${userPoint.jobDetails}/${jobId}`,
          null,
          {
            Authorization: `Bearer ${token}`
          }
        );

        if (!response.data.success) {
          throw new Error(response.data.message || "Failed to fetch job details");
        }

        setJob(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError(error.message || "Failed to fetch job details");
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId, token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700">{error}</p>
        <button 
          onClick={() => navigate(-1)} 
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Job Not Found</h2>
        <button 
          onClick={() => navigate(-1)} 
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { 
    companyId, 
    jobTitle, 
    jobLocation, 
    jobType, 
    salaryRange, 
    skillRequired, 
    description,
    responsibilities,
    requirements,
    experience,
    education,
    applicationDeadline,
    noOfOpenings,
    createdAt
  } = job;

  return (
    <>
    <HomeHeader/>
    <div className="max-w-5xl mx-auto px-4 py-8 pt-24">
        
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
      >
        ← Back to Jobs
      </button>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-start gap-6">
          <img
            src={companyId?.logo || defaultImage}
            alt={companyId?.name || "Company Logo"}
            className="w-24 h-24 object-cover rounded-lg border border-gray-200"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{jobTitle}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Building2 className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700 font-medium">{companyId?.name || "Company Name"}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
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
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">
                  {applicationDeadline ? new Date(applicationDeadline).toLocaleDateString() : "Open until filled"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">{noOfOpenings || 1} opening{noOfOpenings !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">
                  Posted on {new Date(createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {skillRequired?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Required Skills</h2>
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
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Job Description</h2>
            <p className="text-gray-600 whitespace-pre-line">{description}</p>
          </div>
        )}

        {responsibilities && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Responsibilities</h2>
            <div className="pl-4">
              {typeof responsibilities === 'string' ? (
                <p className="text-gray-600 whitespace-pre-line">{responsibilities}</p>
              ) : (
                <ul className="list-disc pl-4 text-gray-600">
                  {responsibilities.map((item, index) => (
                    <li key={index} className="mb-2">{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {requirements && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Requirements</h2>
            <div className="pl-4">
              {typeof requirements === 'string' ? (
                <p className="text-gray-600 whitespace-pre-line">{requirements}</p>
              ) : (
                <ul className="list-disc pl-4 text-gray-600">
                  {requirements.map((item, index) => (
                    <li key={index} className="mb-2">{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {experience && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Experience</h2>
              <p className="text-gray-600">{experience}</p>
            </div>
          )}

          {education && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Education</h2>
              <p className="text-gray-600">{education}</p>
            </div>
          )}
        </div>

        {companyId?.description && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">About the Company</h2>
            <p className="text-gray-600">{companyId.description}</p>
          </div>
        )}

        
       
      </div>
    </div>
</>
  );
};

export default JobDetails;