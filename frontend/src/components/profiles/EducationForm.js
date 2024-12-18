import React, { useState } from 'react';

const EducationForm = ({ onSave }) => {
    const [educationData, setEducationData] = useState({
        universityOrInstitute: '',
        course: '',
        specialization: '',
        courseType: 'full-time',
        courseDurationFrom: '',
        courseDurationTo: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEducationData({ ...educationData, [name]: value });
    };

    const handleSaves = () => {
        onSave(educationData); // Call the onSave prop with the form data
    };

    const handleCancel = () => {
        onSave(null); // Pass null to indicate cancel
    };

    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center h-full w-full">
            <div className="popup-content min-h-[800px] w-[1000px] bg-white relative top-[30px] pl-20 pt-10">
                <h2 className='text-3xl font-bold'>Education</h2>
                <div className="university flex flex-col mt-20">
                    <label htmlFor="University" className='text-2xl font-semibold'>University/Institute: </label>
                    <input
                        className='border w-[70%] p-2 mt-2 bg-zinc-100 rounded-lg'
                        type="text"
                        name="universityOrInstitute"
                        placeholder="University or Institute Name"
                        value={educationData.universityOrInstitute}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="course flex flex-col mt-6">
                    <label htmlFor="course" className='text-2xl font-semibold'>Course: </label>
                    <input
                        className='border w-[70%] p-2 mt-2 bg-zinc-100 rounded-lg'
                        type="text"
                        name="course"
                        placeholder="Course"
                        value={educationData.course}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="specialization flex flex-col mt-6">
                    <label htmlFor="specialization" className='text-2xl font-semibold'>Specialization: </label>
                    <input
                        className='border w-[70%] p-2 mt-2 bg-zinc-100 rounded-lg'
                        type="text"
                        name="specialization"
                        placeholder="Specialization"
                        value={educationData.specialization}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="course-type mt-6 flex flex-col gap-2">
                    <h1 className='text-2xl font-semibold'>Course type</h1>
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

                <div className="course-duration mt-6">
                    <h1 htmlFor="courseDuration" className='text-2xl font-semibold'>Course duration: </h1>
                    <div className="textarea mt-2 flex gap-24">
                        <div className="from w-[50%] flex gap-5 items-center">
                            <label htmlFor="from">from</label>
                            <input
                                className='border w-[75%] p-2 mt-2 bg-zinc-100 rounded-lg'
                                type="date"
                                name="courseDurationFrom"
                                placeholder="From"
                                value={educationData.courseDurationFrom}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="to w-[50%] flex items-center gap-5">
                            <label htmlFor="to">to</label>
                            <input
                                className='border w-[75%] p-2 mt-2 bg-zinc-100 rounded-lg'
                                type="date"
                                name="courseDurationTo"
                                placeholder="To"
                                value={educationData.courseDurationTo}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="popup-buttons mt-16 flex gap-7">
                    <button className='px-3 py-2 border rounded-lg bg-zinc-100' onClick={handleCancel}>Cancel</button>
                    <button className='px-6 py-2 border rounded-lg bg-blue-500 text-white hover:bg-blue-600' onClick={handleSaves}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default EducationForm;
