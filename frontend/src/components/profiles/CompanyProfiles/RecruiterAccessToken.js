import { X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Assuming you'll create this function in your recruiterAPI file
// If not, you'll need to implement this function in the appropriate file
import { tokenRecruiters } from '../../../operations/recruiterAPI';

function RecruiterAccessToken({ isOpen, onClose, recruiterId }) {
  const [jobPostToken, setJobPostToken] = useState(0);
  const [candidateAccessToken, setCandidateAccessToken] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isActive, setIsActive] = useState(true);
  
  const dispatch = useDispatch();
  const token = useSelector((state) => state.company?.token);
  const recruiters = useSelector((state) => state.company?.recruiters);
  
  // Find the current recruiter from the store
  const currentRecruiter = recruiters?.find(recruiter => recruiter._id === recruiterId);
  
  // Fetch the recruiter's current token data
  useEffect(() => {
    if (recruiterId && isOpen) {
      setLoading(true);
      const fetchRecruiterTokenData = async () => {
        try {
          setTimeout(() => {
            if (currentRecruiter) {
              setJobPostToken(currentRecruiter.jobPostToken || 0);
              setCandidateAccessToken(currentRecruiter.candidateAccessToken || 0);
              setIsActive(currentRecruiter.isActive !== false); // Default to true if not specified
            }
            setLoading(false);
          }, 500);
        } catch (err) {
          setError('Failed to fetch recruiter token data');
          setLoading(false);
        }
      };
      
      fetchRecruiterTokenData();
    }
  }, [recruiterId, isOpen, currentRecruiter]);
  
  // Handle updating the recruiter's token amounts
  const handleSave = async () => {
    try {
      setLoading(true);
      
      // Create updated data object
      // const updatedData = {
      //   jobPostToken,
      //   candidateAccessToken,
      //   isActive
      // };
      
      // Call the API function with required parameters
      await dispatch(tokenRecruiters(token, recruiterId, jobPostToken, candidateAccessToken));
      
      setLoading(false);
      onClose();
    } catch (err) {
      setError('Failed to update recruiter tokens');
      setLoading(false);
    }
  };
  
  // Handle toggling the recruiter's active status
  const handleToggleActiveStatus = async () => {
    const action = isActive ? 'deactivate' : 'activate';
    if (window.confirm(`Are you sure you want to ${action} this recruiter?`)) {
      setIsActive(!isActive);
    }
  };
  
  // If the modal is closed, don't render anything
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {currentRecruiter ? `Manage Tokens: ${currentRecruiter.name}` : 'Manage Recruiter Tokens'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X />
          </button>
        </div>
        
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : error ? (
          <div className="text-red-500 py-4">{error}</div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Post Tokens
              </label>
              <input
                type="number"
                value={jobPostToken}
                onChange={(e) => setJobPostToken(parseInt(e.target.value) || 0)}
                className="w-full p-2 border border-gray-300 rounded"
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">
                Number of job posts this recruiter can create
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Candidate Access Tokens
              </label>
              <input
                type="number"
                value={candidateAccessToken}
                onChange={(e) => setCandidateAccessToken(parseInt(e.target.value) || 0)}
                className="w-full p-2 border border-gray-300 rounded"
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">
                Number of candidate profiles this recruiter can access
              </p>
            </div>
            
            <div className="flex justify-between pt-4">
              <button
                onClick={handleToggleActiveStatus}
                className={`${isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white px-4 py-2 rounded transition-colors`}
              >
                {isActive ? 'Deactivate Account' : 'Activate Account'}
              </button>
              
              <div>
                <button
                  onClick={onClose}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecruiterAccessToken;