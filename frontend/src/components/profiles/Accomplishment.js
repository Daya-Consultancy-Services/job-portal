import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { 
  onlineProfiles, 
} from '../../operations/onlineprofileAPI';
import { createCertificates } from '../../operations/certificateAPI';

const API_DISPATCH_MAP = {
  'createonlineProfiles': onlineProfiles,
  'createCertificates': createCertificates
};

const FORM_CONFIGS = {
    'onlineprofile': {
      fields: [
        { name: 'instagramLink', label: 'Instagram URL', type: 'url', placeholder: 'Enter your Instagram URL' },
        { name: 'facebookLink', label: 'Facebook URL', type: 'url', placeholder: 'Enter your Facebook URL' },
        { name: 'githubLink', label: 'Github URL', type: 'url', placeholder: 'Enter your Github URL' },
        { name: 'linkedinLink', label: 'Linkedin URL', type: 'url', placeholder: 'Enter your LinkedIn URL' }
      ],
      dispatchType: 'createonlineProfiles'
    },
    'work-sample': {
      fields: [
        { name: 'companyName', label: 'Company Name', type: 'text', placeholder: 'Enter your company name' },
        { name: 'position', label: 'Position', type: 'text', placeholder: 'Enter your position' },
        { name: 'duration', label: 'Duration', type: 'text', placeholder: 'Enter your duration' },
        { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter your work description' }
      ],
      dispatchType: 'workSamples'
    },
    'journal-entry': {
      fields: [
        { name: 'title', label: 'Title', type: 'text', placeholder: 'Enter your journal entry title' },
        { name: 'date', label: 'Date', type: 'date', placeholder: 'Enter your journal entry date' },
        { name: 'content', label: 'Content', type: 'textarea', placeholder: 'Enter your journal entry content' }
      ],
      dispatchType: 'journalEntries'
    },
    'presentation': {
      fields: [
        { name: 'title', label: 'Title', type: 'text', placeholder: 'Enter your presentation title' },
        { name: 'date', label: 'Date', type: 'date', placeholder: 'Enter your presentation date' },
        { name: 'location', label: 'Location', type: 'text', placeholder: 'Enter your presentation location' },
        { name: 'content', label: 'Content', type: 'textarea', placeholder: 'Enter your presentation content' }
      ],
      dispatchType: 'presentations'
    },
    'patent': {
      fields: [
        { name: 'title', label: 'Title', type: 'text', placeholder: 'Enter your patent title' },
        { name: 'date', label: 'Date', type: 'date', placeholder: 'Enter your patent date' },
        { name: 'inventor', label: 'Inventor', type: 'text', placeholder: 'Enter your inventor name' },
        { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter your patent description' }
      ],
      dispatchType: 'patents'
    },
    'certification': {
      fields: [
        {name: 'certificateName', label:'Certificate Name', type:'text', placeholder: 'Enter your certificate name'},
        {name: 'certificateLink', label:'Certificate Link', type:'text', placeholder: 'Enter your certificate link'},
        {name: 'certificateDescription', label:'Certificate Description', type:'text', placeholder: 'Enter your certificate description'},
      ],
      dispatchType: 'createCertificates'
    }
};

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

export const ModalComponent = ({ isOpen, onClose, sectionType, title, onSave }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const { user } =useSelector((state) => state.profile);

  const { token } = useSelector((state) => state.profile);

  if (!isOpen) return null;

  const config = FORM_CONFIGS[sectionType];

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };


  
const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Add more validation before dispatch
    if (!token) {
        console.error('No authentication token');
        return;
    }

    const sanitizedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value || null])
    );
    
    const dispatchFunction = API_DISPATCH_MAP[config.dispatchType];
    
    if (dispatchFunction) {
      try {
        const response = await dispatch(dispatchFunction(token, sanitizedData));
        
        console.log('Full Response:', response); // Log full response
        
       
        
      } catch (error) {
        console.error('Detailed Error:', {
          message: error.message,
          stack: error.stack
        });
      }
    }
    onClose();
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

export default ModalComponent;