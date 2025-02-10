

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ROLE_TYPE } from '../../../slices/constant';
import { signupCompany, uploadCompanyLogos } from '../../../operations/companyAPI';
function CompanySignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        companyName: '',
        email: '',
        password: '',
        confirmPassword: '',
        description: '',
        website: '',
        location: '',
        recruiter: '',
        companyfield: '',
        role: ROLE_TYPE.COMPANY
    });

    const [errors, setErrors] = useState({});
    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
       
            setFormData(prev => ({ ...prev, [name]: value }));
        
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Required field validations
        if (!formData.companyName.trim()) {
            newErrors.companyName = 'Company name is required';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Website validation
        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
        if (!urlRegex.test(formData.website)) {
            newErrors.website = 'Please enter a valid website URL';
        }

        // Other required fields
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        if (!formData.location.trim()) {
            newErrors.location = 'Location is required';
        }

        if (!formData.recruiter.trim()) {
            newErrors.recruiter = 'Recruiter name is required';
        }

        if (!formData.companyfield.trim()) {
            newErrors.companyfield = 'Company field is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                setIsUploading(true);
    
                // Prepare company registration data
                const companyData = {
                    name: formData.companyName,
                    email: formData.email,
                    password: formData.password,
                    description: formData.description,
                    website: formData.website,
                    location: formData.location,
                    recruiter: formData.recruiter,
                    companyfield: [formData.companyfield], // Ensure it's an array
                    role: formData.role
                };
    
                // Dispatch company registration
                await dispatch(signupCompany(companyData, navigate));
                
            } catch (error) {
                console.error('Registration failed:', error);
                setErrors(prev => ({
                    ...prev,
                    submit: error.response?.data?.message || 'Registration failed. Please try again.'
                }));
            } finally {
                setIsUploading(false);
            }
        }
    };

    const inputClass = (fieldName) => `
        w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
        ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'}
    `;

    return (
        <div className="min-h-screen bg-zinc-100">
            {/* Header */}
            <div className="head w-full h-[80px] bg-white px-[50px] flex justify-center items-center">
                <div className="h-full w-[60%] flex items-center justify-between">
                    <div className="logo h-full w-[85px] flex items-center justify-center">
                        <img src={require('../../../assets/logo.png')} alt="logo" className="relative top-[2px]" />
                    </div>
                    <div className="login">
                        <h2 className="text-lg font-semibold">
                            Already Registered? <Link to="/components/auth/Company/login" className="text-blue-600 hover:text-pink-400">Login</Link> here
                        </h2>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto bg-white rounded-[25px] shadow-md">
                    <div className="p-8">
                        <h2 className="text-2xl font-semibold mb-5">Create your Company Profile</h2>
                        <p className="text-zinc-500 text-sm mb-8">Join India's Leading Job Portal and find the best talent</p>

                        {errors.submit && (
                            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                                {errors.submit}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Company Name */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Company Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        className={inputClass('companyName')}
                                        placeholder="Enter company name"
                                    />
                                    {errors.companyName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={inputClass('email')}
                                        placeholder="Enter email address"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={inputClass('password')}
                                        placeholder="Enter password (min 6 characters)"
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Confirm Password <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={inputClass('confirmPassword')}
                                        placeholder="Confirm your password"
                                    />
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                                    )}
                                </div>

                                {/* Website */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Website <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        className={inputClass('website')}
                                        placeholder="Enter company website"
                                    />
                                    {errors.website && (
                                        <p className="text-red-500 text-sm mt-1">{errors.website}</p>
                                    )}
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Location <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className={inputClass('location')}
                                        placeholder="Enter company location"
                                    />
                                    {errors.location && (
                                        <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                                    )}
                                </div>

                                {/* Company Field */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Company Field <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="companyfield"
                                        value={formData.companyfield}
                                        onChange={handleChange}
                                        className={inputClass('companyfield')}
                                    >
                                        <option value="">Select company field</option>
                                        <option value="IT">IT</option>
                                        <option value="Sales">Sales</option>
                                        <option value="Banking">Banking</option>
                                        <option value="Oil">Oil & Gas</option>
                                        <option value="Healthcare">Healthcare</option>
                                        <option value="Education">Education</option>
                                        <option value="Manufacturing">Manufacturing</option>
                                        <option value="Retail">Retail</option>
                                    </select>
                                    {errors.companyfield && (
                                        <p className="text-red-500 text-sm mt-1">{errors.companyfield}</p>
                                    )}
                                </div>

                                {/* Recruiter */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Recruiter Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="recruiter"
                                        value={formData.recruiter}
                                        onChange={handleChange}
                                        className={inputClass('recruiter')}
                                        placeholder="Enter recruiter name"
                                    />
                                    {errors.recruiter && (
                                        <p className="text-red-500 text-sm mt-1">{errors.recruiter}</p>
                                    )}
                                </div>
                            </div>

                            {/* Description - Full Width */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Company Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className={inputClass('description')}
                                    placeholder="Enter company description"
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                                )}
                            </div>

                           

                            {/* Terms and Conditions */}
                            <div className="text-sm text-gray-600">
                                By clicking Register, you agree to the{' '}
                                <button type="button" className="text-blue-500 hover:text-blue-700">
                                    Terms and Conditions
                                </button>{' '}
                                &{' '}
                                <button type="button" className="text-blue-500 hover:text-blue-700">
                                    Privacy Policy
                                </button>{' '}
                                of Onecareer.com
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={`w-full px-6 py-3 text-white rounded-lg ${
                                    isUploading
                                        ? 'bg-blue-300 cursor-not-allowed'
                                        : 'bg-blue-500 hover:bg-blue-600'
                                }`}
                                disabled={isUploading}
                            >
                                {isUploading ? 'Registering...' : 'Register'}
                            </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        export default CompanySignUp
