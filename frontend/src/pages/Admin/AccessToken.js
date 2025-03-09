import { Cross, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { tokenCompanys } from '../../operations/adminapi';

function AccessToken({ isOpen, onClose, companyId }) {
  const [jobTokenAmount, setJobTokenAmount] = useState(0);
  const [userDetailAccessCount, setUserDetailAccessCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);
  
  const dispatch = useDispatch();
  const token = useSelector((state) => state.admin.token);
  const companies = useSelector((state) => state.admin.allCompany);
  
  // Find the current company from the store
  const currentCompany = companies.find(company => company._id === companyId);
  
  // Fetch the company's current token data
  useEffect(() => {
    if (companyId && isOpen) {
      setLoading(true);
      const fetchCompanyTokenData = async () => {
        try {

          setTimeout(() => {
            if (currentCompany) {
              setJobTokenAmount(currentCompany.jobToken || 0);
              setUserDetailAccessCount(currentCompany.userDetailAccessCount || 0);
              setIsBlocked(currentCompany.isBlocked || false);
            }
            setLoading(false);
          }, 500);
        } catch (err) {
          setError('Failed to fetch company token data');
          setLoading(false);
        }
      };
      
      fetchCompanyTokenData();
    }
  }, [companyId, isOpen, token, dispatch, currentCompany]);
  
  // Handle updating the company's token amounts
  const handleSave = async () => {
    try {
      setLoading(true);
      // Call the API function with all required parameters including isBlocked
      await dispatch(tokenCompanys(
        token,
        companyId,
        jobTokenAmount,  // This should be your input field value for job tokens
        userDetailAccessCount, // This should be your input field value for user detail access
        isBlocked // Pass the current state of isBlocked
      ));
      
      setLoading(false);
      onClose();
    } catch (err) {
      setError('Failed to update company tokens');
      setLoading(false);
    }
  };
  
  // Handle toggling the company's blocked status
  const handleToggleBlockStatus = async () => {
    const action = isBlocked ? 'unblock' : 'block';
    if (window.confirm(`Are you sure you want to ${action} this company?`)) {
      try {
        setLoading(true);
        
        // Just update the local state - we'll send this to the API when save is clicked
        setIsBlocked(!isBlocked);
        setLoading(false);
        
        // No API call here - we'll send the updated block status when handleSave is called
      } catch (err) {
        setError(`Failed to ${action} company`);
        setLoading(false);
      }
    }
  };
  
  // If the modal is closed, don't render anything
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {currentCompany ? `Manage Access: ${currentCompany.name}` : 'Manage Company Access'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X/>
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
                Job Token Amount
              </label>
              <input
                type="number"
                value={jobTokenAmount}
                onChange={(e) => setJobTokenAmount(parseInt(e.target.value) || 0)}
                className="w-full p-2 border border-gray-300 rounded"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User Detail Access Count
              </label>
              <input
                type="number"
                value={userDetailAccessCount}
                onChange={(e) => setUserDetailAccessCount(parseInt(e.target.value) || 0)}
                className="w-full p-2 border border-gray-300 rounded"
                min="0"
              />
            </div>
            
            <div className="flex justify-between pt-4">
              <button
                onClick={handleToggleBlockStatus}
                className={`${isBlocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white px-4 py-2 rounded transition-colors`}
              >
                {isBlocked ? 'Unblock Company' : 'Block Company'}
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

export default AccessToken;