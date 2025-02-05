import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCareers, updateCareers } from '../../operations/careerAPI';

// Custom Dialog Component
const Dialog = ({ open, onClose, children }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-[600px] w-full p-6 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

// Custom Button Component
const Button = ({ children, type = 'button', variant = 'primary', onClick, className = '' }) => {
  const baseClasses = 'px-4 py-2 rounded transition-colors';
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// Custom Input Component
const Input = ({ type = 'text', name, value, onChange, placeholder, required = false, className = '' }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
};

// Updated MultiSelect Component
const MultiSelect = ({ options: predefinedOptions, value, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  // Handle clicking on predefined options
  const handleOptionClick = (option) => {
    if (!value.includes(option)) {
      onChange([...value, option]);
    }
  };

  const toggleOption = (option) => {
    const newValue = value.includes(option)
      ? value.filter(v => v !== option)
      : [...value, option];
    onChange(newValue);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      // Add the new skill if it's not already in the list
      if (!value.includes(inputValue.trim())) {
        const newSkills = [...value, inputValue.trim()];
        onChange(newSkills);
        setInputValue('');  // Clear input after adding
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Selected Skills */}
      <div className="flex flex-wrap gap-2 border rounded p-2 min-h-[42px]">
        {value.map(skill => (
          <span 
            key={skill} 
            className="bg-blue-100 px-2 py-1 rounded text-sm flex items-center"
          >
            {skill}
            <button
              type="button"
              onClick={() => toggleOption(skill)}
              className="ml-1 text-red-500"
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-grow outline-none min-w-[60px]"
        />
      </div>
      
      {/* Predefined Options */}
      <div className="flex flex-wrap gap-2">
        {predefinedOptions.map(option => (
          <button
            key={option}
            type="button"
            onClick={() => handleOptionClick(option)}
            className={`px-2 py-1 rounded text-sm ${
              value.includes(option) 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

// Main CareerProfileModal Component
const CareerProfileModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    industryType: '',
    department: '',
    empType: '',
    skills: [],
    jobLocation: '',
    salary: ''
  });

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.profile);

  // Reset form when modal opens/changes
  useEffect(() => {
    if (initialData && initialData !== "Save Profile") {
      setFormData({
        ...initialData,
        skills: initialData.skills ? initialData.skills.split(', ') : []
      });
    } else {
      setFormData({
        industryType: '',
        department: '',
        empType: '',
        skills: [],
        jobLocation: '',
        salary: ''
      });
    }
  }, [initialData, isOpen]);

  const industryTypes = [
    'Technology', 'Finance', 'Healthcare', 
    'Education', 'Manufacturing', 'Retail'
  ];

  const employmentTypes = [
    'Full-time', 'Part-time', 'Contract', 
    'Freelance', 'Internship'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillsChange = (selectedSkills) => {
    setFormData(prev => ({
      ...prev,
      skills: selectedSkills
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a copy of formData with properly formatted skills
    const submitData = {
      ...formData,
      skills: Array.isArray(formData.skills) ? formData.skills.join(', ') : ''
    };

    try {
      if (!initialData || initialData === "Save Profile") {
        await dispatch(createCareers(token, submitData));
        console.log("Creating career profile:", submitData);
      } else {
        const profileId = initialData._id || initialData.id;
        if (profileId) {
          await dispatch(updateCareers(token, profileId, submitData));
          console.log("Updating career profile:", submitData);
        } else {
          throw new Error("No valid profile ID found for updating");
        }
      }

      onSubmit(submitData);
      onClose();
    } catch (error) {
      console.error("Error saving career profile:", error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div>
        <h2 className="text-xl font-bold mb-2">
          {initialData && initialData !== "Save Profile" ? 'Edit Career Profile' : 'Add Career Profile'}
        </h2>
        <p className="text-gray-600 mb-4">
          {initialData && initialData !== "Save Profile"
            ? 'Update your existing career details' 
            : 'Fill in your career details to personalize job recommendations'}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Industry Type</label>
            <select
              name="industryType"
              value={formData.industryType}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Industry</option>
              {industryTypes.map(industry => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">Department</label>
            <Input 
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              placeholder="Enter Department"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Employment Type</label>
            <select
              name="empType"
              value={formData.empType}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Employment Type</option>
              {employmentTypes.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">Skills</label>
            <MultiSelect
              options={[
                'React', 'Python', 'JavaScript', 
                'Data Analysis', 'Machine Learning'
              ]}
              value={formData.skills}
              onChange={handleSkillsChange}
              placeholder="Type or select skills"
            />
          </div>

          <div>
            <label className="block mb-2">Job Location</label>
            <Input 
              name="jobLocation"
              value={formData.jobLocation}
              onChange={handleInputChange}
              placeholder="Enter Job Location"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Salary Expectation</label>
            <Input 
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleInputChange}
              placeholder="Enter Salary Expectation"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit">
              {initialData && initialData !== "Save Profile" ? 'Update Profile' : 'Save Profile'}
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default CareerProfileModal;