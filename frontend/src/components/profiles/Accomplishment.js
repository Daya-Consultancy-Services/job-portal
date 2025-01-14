import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { onlineProfiles } from '../../operations/onlineprofileAPI';

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
    // Other configurations omitted for brevity
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

  const handleSubmit = () => {
    // Convert empty fields to null
    const sanitizedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value || null])
    );

    const data = { token, ...sanitizedData };

    dispatch(onlineProfiles(token, sanitizedData)); // Call API (adjust as per your logic)
    onSave(sectionType, sanitizedData); // Save data locally
    setFormData({});
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
