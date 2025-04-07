

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { downloadResume, uploadResume, deleteResume, fetchExtraProfile } from '../../operations/profileAPI';
import { toast } from 'react-hot-toast';

const ResumeUpload = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.profile.token);

  const resumeData = useSelector((state) => state.profile.extraprofile?.resume);
  const [resumeName, setResumeName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        setIsLoading(true);
        try {
          await dispatch(fetchExtraProfile(token));
        } catch (error) {
          toast.error('Failed to fetch resume data');
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchData();
  }, [dispatch, token]);

  useEffect(() => {
    if (resumeData) {
      setResumeName(resumeData);
    }
  }, [resumeData]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }

      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload PDF or DOC/DOCX files only');
        return;
      }

      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append('resume', file);
        await dispatch(uploadResume(token, formData));
        setResumeName(file.name);
        toast.success('Resume uploaded successfully!');
      } catch (error) {
        toast.error('Failed to upload resume');
        console.error('Upload error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      await dispatch(downloadResume(token));
    } catch (error) {
      toast.error('Failed to download resume');
      console.error('Download error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your resume?')) {
      setIsLoading(true);
      try {
        await dispatch(deleteResume(token));
        setResumeName('');
        toast.success('Resume deleted successfully');
      } catch (error) {
        toast.error('Failed to delete resume');
        console.error('Delete error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : resumeName ? (
        // Show resume details and actions when resume exists
        <div className="text-center space-y-6">
          <div className="p-4 bg-gray-50 rounded-lg space-y-2">
            <p className="text-gray-700">
              Current Resume: <span className="font-medium text-gray-900">{resumeName}</span>
            </p>
            {resumeData && (
              <>
              
                {resumeData.fileSize && (
                  <p className="text-sm text-gray-600">
                    Size: {Math.round(resumeData.fileSize / 1024)} KB
                  </p>
                )}
              </>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg
                       hover:bg-red-600 transition-colors duration-200
                       flex-1 sm:flex-none"
              disabled={isLoading}
            >
              Delete Resume
            </button>
            
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg
                       hover:bg-blue-600 transition-colors duration-200
                       flex-1 sm:flex-none"
              disabled={isLoading}
            >
              Download Resume
            </button>
          </div>
        </div>
      ) : (
        // Show upload interface only when no resume exists
        <div className="border-2 border-dashed border-gray-300 p-8 rounded-lg text-center">
          <div className="space-y-4">
            <label className="block">
              <span className="sr-only">Choose resume file</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-500 
                          file:mr-4 file:py-2 file:px-4 
                          file:rounded-full file:border-0 
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700 
                          hover:file:bg-blue-100
                          cursor-pointer"
              />
            </label>
            <p className="text-sm text-gray-500">
              Supported formats: PDF, DOC, DOCX (Max size: 5MB)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;