import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';

const FORM_CONFIGS = {
    'online-profile': {
      fields: [
        { name: 'instagramLink', label: 'Instagram URL', type: 'url', placeholder: 'Enter your Instagram URL' },
        { name: 'facebookLink', label: 'Facebook URL', type: 'url', placeholder: 'Enter your Facebook URL' },
        { name: 'githubLink', label: 'Github URL', type: 'url', placeholder: 'Enter your Github URL' },
        { name: 'linkedinLink', label: 'Linkedin URL', type: 'url', placeholder: 'Enter your LinkedIn URL' }
      ],
      dispatchType: 'onlineProfiles'
    },
  
    'work-sample': {
      fields: [
        { name: 'projectTitle', label: 'Project Title', type: 'text', placeholder: 'Enter project title' },
        { name: 'projectUrl', label: 'Project URL', type: 'url', placeholder: 'Enter project URL' },
        { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe your work sample' }
      ],
      dispatchType: 'ADD_WORK_SAMPLE'
    },
  
    'white-paper': {
      fields: [
        { name: 'publicationTitle', label: 'Publication Title', type: 'text', placeholder: 'Enter publication title' },
        { name: 'publicationUrl', label: 'Publication URL', type: 'url', placeholder: 'Enter publication URL' },
        { name: 'authors', label: 'Authors', type: 'text', placeholder: "Enter authors' names" },
        { name: 'abstract', label: 'Abstract', type: 'textarea', placeholder: 'Enter publication abstract' }
      ],
      dispatchType: 'ADD_WHITE_PAPER'
    },
  
    'presentation': {
      fields: [
        { name: 'presentationTitle', label: 'Presentation Title', type: 'text', placeholder: 'Enter presentation title' },
        { name: 'presentationUrl', label: 'Presentation URL', type: 'url', placeholder: 'Enter presentation URL' }
      ],
      dispatchType: 'ADD_PRESENTATION'
    },
  
    'patent': {
      fields: [
        { name: 'patentTitle', label: 'Patent Title', type: 'text', placeholder: 'Enter patent title' },
        { name: 'patentNumber', label: 'Patent Number', type: 'text', placeholder: 'Enter patent number' },
        { name: 'filingDate', label: 'Filing Date', type: 'date' },
        { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter patent description' }
      ],
      dispatchType: 'ADD_PATENT'
    },
  
    'certification': {
      fields: [
        { name: 'certName', label: 'Certification Name', type: 'text', placeholder: 'Enter certification name' },
        { name: 'issuingOrg', label: 'Issuing Organization', type: 'text', placeholder: 'Enter issuing organization' },
        { name: 'issueDate', label: 'Issue Date', type: 'date' },
        { name: 'expiryDate', label: 'Expiry Date', type: 'date', placeholder: 'Select expiry date (if applicable)' },
        { name: 'credentialUrl', label: 'Credential URL', type: 'url', placeholder: 'Enter credential URL' }
      ],
      dispatchType: 'ADD_CERTIFICATION'
    },
  
    'career-profile': {
      fields: [
        { name: 'currentRole', label: 'Current Role', type: 'text', placeholder: 'Enter your current role' },
        { name: 'preferredRole', label: 'Preferred Role', type: 'text', placeholder: 'Enter your preferred role' },
        { name: 'industry', label: 'Industry', type: 'text', placeholder: 'Enter your industry' },
        { name: 'yearsOfExperience', label: 'Years of Experience', type: 'number', placeholder: 'Enter years of experience' },
        { name: 'careerGoals', label: 'Career Goals', type: 'textarea', placeholder: 'Describe your career goals' }
      ],
      dispatchType: 'ADD_CAREER_PROFILE'
    }
  };
  
  // Updated Modal component to handle textarea inputs
  const renderField = (field, value, onChange) => {
    if (field.type === 'textarea') {
      return (
        <textarea
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          name={field.name}
          placeholder={field.placeholder}
          rows={4}
          value={value || ''}
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      );
    }
  
    return (
      <input
        type={field.type}
        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        name={field.name}
        placeholder={field.placeholder}
        value={value || ''}
        onChange={(e) => onChange(field.name, e.target.value)}
      />
    );
  };
  

export const ModalComponent = ({ isOpen, onClose, sectionType, title }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

     const {token} = useSelector((state) => state.profile);

  

  if (!isOpen) return null;

  const config = FORM_CONFIGS[sectionType];

  const validateForm = () => {
    const newErrors = {};
    config.fields.forEach(field => {
      if (!formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = () => {
   
    if (validateForm()) {
        alert(`Data being sent: ${JSON.stringify(
            {
              type: config.dispatchType,
              payload: {
                token,
                formData,
              },
            },
            null,
            2 // Indent with 2 spaces for readability
          )}`);
        dispatch(
             config.dispatchType,
           
              token,
              formData,
            
          );
      
      setFormData({});
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        <form className="space-y-4">
  {config.fields.map((field) => (
    <div key={field.name}>
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
      </label>
      {renderField(field, formData[field.name], handleInputChange)}
      {errors[field.name] && (
        <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
      )}
    </div>
  ))}
</form>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent