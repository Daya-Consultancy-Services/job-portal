import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEducationProfiles, updateEducationProfiles } from '../../operations/educationprofileAPI';
import { X } from 'lucide-react';

const EducationForm = ({ onSave, initialData = null }) => {
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.profile);
    const [educationData, setEducationData] = useState({
        
        institutionName: '',
        courseName: '',
        courseType: 'full-time',
        duration: '',
        marks: '',
        location: '',
        education: ''
    });

    useEffect(() => {
        if (initialData) {
            // Copy initial data without _id field
            const { _id, ...dataWithoutId } = initialData;
            setEducationData(dataWithoutId);
        }
    }, [initialData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEducationData({ ...educationData, [name]: value });
    };

    const handleSave = async () => {
        try {
            if (initialData) {
                // Update existing profile
                await dispatch(updateEducationProfiles(token, initialData._id, educationData));
            } else {
                // Create new profile
                await dispatch(createEducationProfiles(token, educationData));
            }
            
            // Pass education data without _id to parent component
            onSave(educationData);
        } catch (error) {
            console.error("Error saving education profile:", error);
        }
    };

    const handleCancel = () => {
        onSave(null);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center h-full w-full z-[9999999999]">
            <div className="popup-content min-h-[600px] w-[1000px] bg-white relative pl-20 p-10">
                <div className="flex justify-between pr-8">
                    <h2 className="text-3xl font-bold">{initialData ? 'Edit Education' : 'Add Education'}</h2>
                    <button onClick={handleCancel} className="hover:bg-gray-100 p-2 rounded-full">
                        <X size={24} />
                    </button>
                </div>
                
                <div className="education-level flex flex-col mt-8">
                    <label htmlFor="education" className="text-2xl font-semibold">Education Level: </label>
                    <select
                        className="border w-[100%] p-2 mt-2 bg-zinc-100 rounded-lg"
                        name="education"
                        value={educationData.education}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Education Level</option>
                        <option value="10th">10th</option>
                        <option value="12th">12th</option>
                        <option value="Graduation">Graduation</option>
                        <option value="Post-graduation">Post-graduation</option>
                        <option value="PHD">PHD</option>
                    </select>
                </div>

                <div className="university flex flex-col mt-4">
                    <label htmlFor="institutionName" className="text-2xl font-semibold">University/Institute: </label>
                    <input
                        className="border w-[100%] p-2 mt-2 bg-zinc-100 rounded-lg"
                        type="text"
                        name="institutionName"
                        placeholder="University or Institute Name"
                        value={educationData.institutionName}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="course flex flex-col mt-4">
                    <label htmlFor="courseName" className="text-2xl font-semibold">Course: </label>
                    <input
                        className="border w-[100%] p-2 mt-2 bg-zinc-100 rounded-lg"
                        type="text"
                        name="courseName"
                        placeholder="Course Name"
                        value={educationData.courseName}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="location flex flex-col mt-4">
                    <label htmlFor="location" className="text-2xl font-semibold">Location: </label>
                    <input
                        className="border w-[100%] p-2 mt-2 bg-zinc-100 rounded-lg"
                        type="text"
                        name="location"
                        placeholder="Institution Location"
                        value={educationData.location}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="course-type mt-4 flex flex-col gap-2">
                    <h1 className="text-2xl font-semibold">Course Type</h1>
                    <div className="radio-btn flex gap-20">
                        <label>
                            <input
                                type="radio"
                                name="courseType"
                                value="full-time"
                                checked={educationData.courseType === 'full-time'}
                                onChange={handleInputChange}
                            />
                            Full-time
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="courseType"
                                value="part-time"
                                checked={educationData.courseType === 'part-time'}
                                onChange={handleInputChange}
                            />
                            Part-time
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="courseType"
                                value="distance-learning"
                                checked={educationData.courseType === 'distance-learning'}
                                onChange={handleInputChange}
                            />
                            Distance learning
                        </label>
                    </div>
                </div>

                <div className="duration flex flex-col mt-4">
                    <label htmlFor="duration" className="text-2xl font-semibold">Duration: </label>
                    <input
                        className="border w-[100%] p-2 mt-2 bg-zinc-100 rounded-lg"
                        type="text"
                        name="duration"
                        placeholder="e.g., 2 years, 4 semesters"
                        value={educationData.duration}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="marks flex flex-col mt-4">
                    <label htmlFor="marks" className="text-2xl font-semibold">Marks/Grade: </label>
                    <input
                        className="border w-[100%] p-2 mt-2 bg-zinc-100 rounded-lg"
                        type="text"
                        name="marks"
                        placeholder="e.g., 85%, 3.8 GPA"
                        value={educationData.marks}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="popup-buttons mt-8 flex gap-7">
                    <button className="px-3 py-2 border rounded-lg bg-zinc-100" onClick={handleCancel}>Cancel</button>
                    <button className="px-6 py-2 border rounded-lg bg-blue-500 text-white hover:bg-blue-600" onClick={handleSave}>
                        {initialData ? 'Update' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EducationForm;