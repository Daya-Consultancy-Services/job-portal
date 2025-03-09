
import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Users } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJob, createJob, updateJob, deleteJob, fetchJobApplicants, userDetailAccess, downloadUserDetailForRecruiter } from '../../../operations/recruiterAPI';
import toast from 'react-hot-toast';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const Jobs = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.recruiter.token);
  const recruiterData = useSelector(state => state.recruiter.recruiterData);
  const applicantData = useSelector(state => state.recruiter.applicantData);
  console.log(applicantData);
  
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplicantsModalOpen, setIsApplicantsModalOpen] = useState(false);
  const [currentApplicants, setCurrentApplicants] = useState([]);
  const [currentJobTitle, setCurrentJobTitle] = useState('');
  const [isApplicantDetailModalOpen, setIsApplicantDetailModalOpen] = useState(false);
  // const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobLocation: "",
    jobType: "",
    description: "",
    skillRequired: "",
    salaryRange: "",
    appliedUsers:[],
  });

  
  // Fetch jobs when component mounts or token changes
  useEffect(() => {
    if (token) {
      dispatch(fetchJob(token));
    
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (recruiterData && Array.isArray(recruiterData)) {
      // Map API data to component format
      const formattedJobs = recruiterData.map(job => ({
        id: job._id,
        title: job.jobTitle,
        location: job.jobLocation || '',
        type: job.jobType || '',
        description: job.description || '',
        requirements: Array.isArray(job.skillRequired) 
          ? job.skillRequired.join(', ') 
          : typeof job.skillRequired === 'string' 
            ? job.skillRequired 
            : '',
        salary: job.salaryRange || '',
        appliedUsers: job.appliedUsers || [] 
      }));
      setJobs(formattedJobs);
    }
  }, [recruiterData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare data for API
    const jobData = {
      ...formData,
      skillRequired: formData.skillRequired
        ? formData.skillRequired.split(',').map(skill => skill.trim())
        : []
    };
    
    if (editingJob) {
      dispatch(updateJob(
        token,
        editingJob.id,
        jobData,
      ));
    } else {
      dispatch(createJob(token, jobData));
    }
    
    handleCloseModal();
  };

  const handleDelete = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      dispatch(deleteJob(token, jobId));
      setJobs(prev => prev.filter(job => job.id !== jobId));
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData({
      jobTitle: job.title || '',
      jobLocation: job.location || '',
      jobType: job.type || '',
      description: job.description || '',
      skillRequired: typeof job.requirements === 'string'
        ? job.requirements
        : Array.isArray(job.requirements)
          ? job.requirements.join(', ')
          : '',
      salaryRange: job.salary || '',
    });
    setIsModalOpen(true);
  };

  const handleViewApplicants = (jobId, jobTitle) => {
    const job = recruiterData.find(job => job._id === jobId);
    console.log("applied users", job.appliedUsers);
    if (job && job.appliedUsers) {
      setCurrentApplicants(job.appliedUsers);
      setCurrentJobTitle(jobTitle);
      setIsApplicantsModalOpen(true);
    } else {
      setCurrentApplicants([]);
      setCurrentJobTitle(jobTitle);
      setIsApplicantsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingJob(null);
    setFormData({
      jobTitle: "",
      jobLocation: "",
      jobType: "",
      description: "",
      skillRequired: "",
      salaryRange: "",
    });
  };

  const handleCloseApplicantsModal = () => {
    setIsApplicantsModalOpen(false);
    setCurrentApplicants([]);
    setCurrentJobTitle('');
  };

  const handleViewApplicantDetail = (applicant) => {

   dispatch(userDetailAccess(token, applicant._id));
    
    setIsApplicantDetailModalOpen(true);
  };

  const handleCloseApplicantDetailModal = () => {
    setIsApplicantDetailModalOpen(false);
    
  };

  const downloadUser = async () => {
    if (!applicantData || !applicantData._id) {
      toast.error("No applicant data found or missing ID");
      return;
    }
    
    console.log("Downloading user details for ID:", applicantData._id);
    
    try {
      await dispatch(downloadUserDetailForRecruiter(token, applicantData._id));
    } catch (e) {
      console.log("Something went wrong", e);
      toast.error("Failed to download user details");
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Job Listings</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" />
          Add New Job
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingJob ? 'Edit Job Listing' : 'Create New Job Listing'}
      >
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                name="jobLocation"
                value={formData.jobLocation}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Job Type</label>
              <input
                type="text"
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Salary Range</label>
              <input
                type="text"
                name="salaryRange"
                value={formData.salaryRange}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded h-20 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Requirements (comma-separated)</label>
            <textarea
              name="skillRequired"
              value={formData.skillRequired}
              onChange={handleInputChange}
              className="w-full p-2 border rounded h-20 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              placeholder="E.g. React, JavaScript, 3+ years experience"
            />
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {editingJob ? 'Update Job' : 'Create Job'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Applicants List Modal */}
      <Modal
        isOpen={isApplicantsModalOpen}
        onClose={handleCloseApplicantsModal}
        title={`Applicants for: ${currentJobTitle}`}
      >
        <div className="space-y-4">
          {currentApplicants.length > 0 ? (
            currentApplicants.map((applicant) => (
              <div 
                key={applicant._id} 
                className="border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                onClick={() => handleViewApplicantDetail(applicant)}
              >
                <div className="flex justify-between">
                  <h3 className="font-medium text-lg">{applicant.firstName + " " + applicant.lastName || 'Anonymous Applicant'}</h3>
                  <span className="text-sm text-gray-500">
                    Applied: {new Date(applicant.appliedDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Email:</span>
                    <span className="text-sm ml-1">{applicant.email || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Phone:</span>
                    <span className="text-sm ml-1">{applicant.phone || 'N/A'}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500">
              No applicants found for this job posting yet.
            </div>
          )}
        </div>
      </Modal>

      {/* Applicant Detail Modal */}
      <Modal
        isOpen={isApplicantDetailModalOpen}
        onClose={handleCloseApplicantDetailModal}
        title="Applicant Details"
      >
        {applicantData && (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-blue-800 mb-2">
                {applicantData.firstName} {applicantData.lastName}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4 mt-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-600">Contact Information</h4>
                  <div className="mt-1 space-y-1">
                    <div className="flex items-start">
                      <span className="text-sm font-medium w-20">Email:</span>
                      <span className="text-sm">{applicantData.email || 'N/A'}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-sm font-medium w-20">Phone:</span>
                      <span className="text-sm">{applicantData.phone || 'N/A'}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-sm font-medium w-20">Location:</span>
                      <span className="text-sm">{applicantData.location || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-600">Application Details</h4>
                  <div className="mt-1 space-y-1">
                    <div className="flex items-start">
                      <span className="text-sm font-medium w-20">Applied:</span>
                      <span className="text-sm">
                        {applicantData.appliedDate 
                          ? new Date(applicantData.appliedDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }) 
                          : 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-sm font-medium w-20">Status:</span>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded">
                        {applicantData.status || 'Applied'}
                      </span>
                    </div>
                  </div>
                </div>
            
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-3">
                <h4 className="font-medium text-gray-700 mb-2">Experience</h4>
                <p className="text-sm text-gray-600">{applicantData.experience || 'No experience information provided'}</p>
              </div>
              
              <div className="border rounded-lg p-3">
                <h4 className="font-medium text-gray-700 mb-2">Education</h4>
                <p className="text-sm text-gray-600">{applicantData.education || 'No education information provided'}</p>
              </div>
            </div>
            
            <div className="border rounded-lg p-3">
              <h4 className="font-medium text-gray-700 mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(applicantData.skills) && applicantData.skills.length > 0 ? (
                  applicantData.skills.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-600">No skills listed</p>
                )}
              </div>
            </div>
            
            {applicantData.aboutMe && (
              <div className="border rounded-lg p-3">
                <h4 className="font-medium text-gray-700 mb-2">About</h4>
                <p className="text-sm text-gray-600">{applicantData.aboutMe}</p>
              </div>
            )}
            
            {applicantData.resumeUrl && (
              <div className="mt-4 flex justify-center">
                <a 
                  href={applicantData.resumeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
                >
                  View Resume
                </a>
              </div>
            )}
                <div className="button px-2 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white flex justify-center">
                  <button onClick={downloadUser} className='w-full h-full'>Download User</button>
                </div>
          </div>
        )}
      </Modal>

      <div className="space-y-3">
        {jobs.length > 0 ? (
          jobs.map(job => (
            <div key={job.id} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex justify-between items-start mt-1">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{job.title || 'Untitled Job'}</h2>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleViewApplicants(job.id, job.title)}
                    className="p-1.5 text-blue-600 hover:text-blue-800 transition-colors"
                    title="View Applicants"
                  >
                    <Users className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleEdit(job)}
                    className="p-1.5 text-gray-600 hover:text-gray-800 transition-colors"
                    title="Edit Job"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="p-1.5 text-red-600 hover:text-red-800 transition-colors"
                    title="Delete Job"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="bg-gray-50 p-2 rounded">
                  <span className="block text-sm font-medium text-gray-600">Location</span>
                  <span className="text-gray-900">{job.location || 'Not specified'}</span>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <span className="block text-sm font-medium text-gray-600">Type</span>
                  <span className="text-gray-900">{job.type || 'Not specified'}</span>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <span className="block text-sm font-medium text-gray-600">Salary</span>
                  <span className="text-gray-900">{job.salary || 'Not specified'}</span>
                </div>
              </div>
              <div className="mt-3">
                <h4 className="text-base font-medium text-gray-800 mb-1">Description</h4>
                <p className="text-gray-600 text-sm">{job.description || 'No description provided'}</p>
              </div>
              <div className="mt-2">
                <h4 className="text-base font-medium text-gray-800 mb-1">Requirements</h4>
                <p className="text-gray-600 text-sm">{job.requirements || 'No requirements specified'}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No jobs found. Click "Add New Job" to create your first job posting.
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;