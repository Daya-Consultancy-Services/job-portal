import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEmploymentProfiles, updateEmploymentProfiles } from '../../operations/employmentprofileAPI';

const EmploymentForm = ({ initialData = null, onClose }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({
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
    jobDescription: '',
  });

  const [isFormVisible, setIsFormVisible] = useState(true);
  const isEditing = Boolean(initialData);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        joinDate: initialData.joinDate?.split('T')[0] || '',
        leaveDate: initialData.leaveDate?.split('T')[0] || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await dispatch(updateEmploymentProfiles(token, initialData._id, formData));
      } else {
        console.log(formData, token)
        await dispatch(createEmploymentProfiles(token, formData));
      }
      handleClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleClose = () => {
    setIsFormVisible(false);
    if (onClose) onClose();
  };

  if (!isFormVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999999999999]">
      <div className="w-[90%]">
        <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 py-1 px-3 rounded-lg hover:bg-red-700 focus:outline-none"
          >
            X
          </button>
          <h2 className="text-xl font-semibold text-gray-800">
            {isEditing ? 'Edit Employment Profile' : 'Add Employment Profile'}
          </h2>

          <div className="flex items-center space-x-4">
            <label htmlFor="isCurrentEmp" className="text-gray-700 font-medium">Currently Employed</label>
            <input
              id="isCurrentEmp"
              name="isCurrentEmp"
              type="checkbox"
              checked={formData.isCurrentEmp}
              onChange={handleChange}
              className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="empType" className="block text-gray-700 font-medium">Employment Type</label>
            <select
              id="empType"
              name="empType"
              value={formData.empType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select employment type</option>
              <option value="Internship">Internship</option>
              <option value="Fulltime">Full-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="currentJobTitle" className="block text-gray-700 font-medium">Job Title</label>
              <input
                id="currentJobTitle"
                name="currentJobTitle"
                type="text"
                value={formData.currentJobTitle}
                onChange={handleChange}
                placeholder="Enter job title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="totalExp" className="block text-gray-700 font-medium">Total Experience</label>
              <input
                id="totalExp"
                name="totalExp"
                type="text"
                value={formData.totalExp}
                onChange={handleChange}
                placeholder="Years of experience"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="joinDate" className="block text-gray-700 font-medium">Join Date</label>
              <input
                id="joinDate"
                name="joinDate"
                type="date"
                value={formData.joinDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="leaveDate" className="block text-gray-700 font-medium">Leave Date</label>
              <input
                id="leaveDate"
                name="leaveDate"
                type="date"
                value={formData.leaveDate}
                onChange={handleChange}
                disabled={formData.isCurrentEmp}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="currentSalary" className="block text-gray-700 font-medium">Current Salary</label>
              <input
                id="currentSalary"
                name="currentSalary"
                type="text"
                value={formData.currentSalary}
                onChange={handleChange}
                placeholder="Enter salary"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="skill" className="block text-gray-700 font-medium">Skills</label>
              <input
                id="skill"
                name="skill"
                type="text"
                value={formData.skill}
                onChange={handleChange}
                placeholder="Enter skills"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="jobProfile" className="block text-gray-700 font-medium">Job Profile</label>
              <input
                id="jobProfile"
                name="jobProfile"
                type="text"
                value={formData.jobProfile}
                onChange={handleChange}
                placeholder="Enter job profile"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="noticePeriod" className="block text-gray-700 font-medium">Notice Period</label>
              <input
                id="noticePeriod"
                name="noticePeriod"
                type="text"
                value={formData.noticePeriod}
                onChange={handleChange}
                placeholder="Enter notice period"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="jobDescription" className="block text-gray-700 font-medium">Job Description</label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              placeholder="Enter job description"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isEditing ? 'Update Employment Profile' : 'Save Employment Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmploymentForm;