

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEmploymentProfiles, updateEmploymentProfiles } from '../../operations/employmentprofileAPI';

const EMPLOYMENT_TYPES = [
  { value: 'Internship', label: 'Internship' },
  { value: 'Fulltime', label: 'Full-time' },
  { value: 'Contract', label: 'Contract' },
  { value: 'Freelance', label: 'Freelance' }
];

const defaultFormData = {
  isCurrentEmp: true,
  empType: '',
  totalExp: '',
  currentJobTitle: '',
  joinDate: '',
  leaveDate: '',
  currentSalary: '',
  skill: '',
  jobProfile: '',
  noticePeriod: '',
  jobDescription: ''
};

const EmploymentForm = ({ initialData = null, onClose }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.profile);
  const [formData, setFormData] = useState(defaultFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isEditing = Boolean(initialData);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...defaultFormData,
        ...initialData,
        joinDate: initialData.joinDate?.split('T')[0] || '',
        leaveDate: initialData.leaveDate?.split('T')[0] || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'isCurrentEmp' && checked ? { leaveDate: '' } : {})
    }));
  };

  const validateForm = () => {
    const requiredFields = ['empType', 'currentJobTitle', 'joinDate', 'jobProfile'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return false;
    }
    
    if (!formData.isCurrentEmp && !formData.leaveDate) {
      setError('Please provide a leave date for past employment');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      if (isEditing) {
        console.log("token", token, "id", initialData._id, "form data", formData)
        await dispatch(updateEmploymentProfiles(token, initialData._id, formData));
      } else {
        await dispatch(createEmploymentProfiles(token, formData));
      }
      onClose();
    } catch (error) {
      setError(error.message || 'An error occurred while saving the employment profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90%] max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {isEditing ? 'Edit Employment Profile' : 'Add Employment Profile'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              id="isCurrentEmp"
              name="isCurrentEmp"
              checked={formData.isCurrentEmp}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label htmlFor="isCurrentEmp" className="text-sm font-medium">
              Currently Employed
            </label>
          </div>

          <div className="space-y-2">
            <label htmlFor="empType" className="block text-sm font-medium">
              Employment Type
            </label>
            <select
              id="empType"
              name="empType"
              value={formData.empType}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select employment type</option>
              {EMPLOYMENT_TYPES.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="currentJobTitle" className="block text-sm font-medium">
                Job Title
              </label>
              <input
                type="text"
                id="currentJobTitle"
                name="currentJobTitle"
                value={formData.currentJobTitle}
                onChange={handleChange}
                placeholder="Enter job title"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="totalExp" className="block text-sm font-medium">
                Total Experience (years)
              </label>
              <input
                type="number"
                id="totalExp"
                name="totalExp"
                min="0"
                step="0.5"
                value={formData.totalExp}
                onChange={handleChange}
                placeholder="Years of experience"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="joinDate" className="block text-sm font-medium">
                Join Date
              </label>
              <input
                type="date"
                id="joinDate"
                name="joinDate"
                value={formData.joinDate}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="leaveDate" className="block text-sm font-medium">
                Leave Date
              </label>
              <input
                type="date"
                id="leaveDate"
                name="leaveDate"
                value={formData.leaveDate}
                onChange={handleChange}
                disabled={formData.isCurrentEmp}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="currentSalary" className="block text-sm font-medium">
                Current Salary
              </label>
              <input
                type="number"
                id="currentSalary"
                name="currentSalary"
                min="0"
                value={formData.currentSalary}
                onChange={handleChange}
                placeholder="Enter salary"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="skill" className="block text-sm font-medium">
                Skills
              </label>
              <input
                type="text"
                id="skill"
                name="skill"
                value={formData.skill}
                onChange={handleChange}
                placeholder="Enter skills (comma separated)"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="jobProfile" className="block text-sm font-medium">
                Job Profile
              </label>
              <input
                type="text"
                id="jobProfile"
                name="jobProfile"
                value={formData.jobProfile}
                onChange={handleChange}
                placeholder="Enter job profile"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="noticePeriod" className="block text-sm font-medium">
                Notice Period
              </label>
              <input
                type="text"
                id="noticePeriod"
                name="noticePeriod"
                value={formData.noticePeriod}
                onChange={handleChange}
                placeholder="Enter notice period"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="jobDescription" className="block text-sm font-medium">
              Job Description
            </label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              placeholder="Enter job description"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400"
          >
            {loading ? 'Saving...' : isEditing ? 'Update Employment Profile' : 'Save Employment Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmploymentForm;