import React, { useState } from 'react';

const ResumeUpload = () => {
  const [resumeName, setResumeName] = useState(localStorage.getItem('resumeName') || '');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        // Store file data and name in localStorage
        localStorage.setItem('resumeData', reader.result);
        localStorage.setItem('resumeName', file.name);
        setResumeName(file.name);
        alert('Resume uploaded and saved to local storage!');
      };

      reader.readAsDataURL(file); // Convert file to base64
    }
  };

  const handleRemove = () => {
    // Clear localStorage and state
    localStorage.removeItem('resumeData');
    localStorage.removeItem('resumeName');
    setResumeName('');
    alert('Resume removed from local storage.');
  };

  return (
    <div className="w-full mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">Upload your Resume</h3>

      {!resumeName ? (
        <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
          <p className="mt-2 text-xs text-gray-500">Supported formats: PDF, DOC, DOCX</p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-700 mb-2">
            Uploaded Resume: <strong className="text-gray-900">{resumeName}</strong>
          </p>
          <button
            onClick={handleRemove}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Remove Resume
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
