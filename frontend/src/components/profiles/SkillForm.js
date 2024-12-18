import React, { useState } from 'react';

const SkillsForm = ({ onSave }) => {
    const [skillsData, setSkillsData] = useState({
        skillName: '',
        experienceYears: '',
        experienceMonths: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSkillsData({ ...skillsData, [name]: value });
    };

    const handleSaves = () => {
        onSave(skillsData); // Call the onSave prop with the form data
    };

    const handleCancel = () => {
        onSave(null); // Pass null to indicate cancel
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center h-full w-full">
            <div className="popup-content min-h-[600px] w-[700px] bg-white relative top-[30px] pl-10 pt-10">
                <h2 className='text-3xl font-bold'>IT Skills</h2>
                <div className="skill-name flex flex-col mt-10">
                    <label htmlFor="skillName" className='text-xl font-semibold'>Skill Name: </label>
                    <input
                        className='border w-full p-2 mt-2 bg-zinc-100 rounded-lg'
                        type="text"
                        name="skillName"
                        placeholder="Skill Name"
                        value={skillsData.skillName}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="experience flex flex-col mt-6">
                    <label htmlFor="experienceYears" className='text-2xl font-semibold'>Experience (Years): </label>
                    <input
                        className='border w-[48%] p-2 mt-2 bg-zinc-100 rounded-lg'
                        type="number"
                        name="experienceYears"
                        placeholder="Years"
                        value={skillsData.experienceYears}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="experience flex flex-col mt-6">
                    <label htmlFor="experienceMonths" className='text-2xl font-semibold'>Experience (Months): </label>
                    <input
                        className='border w-[48%] p-2 mt-2 bg-zinc-100 rounded-lg'
                        type="number"
                        name="experienceMonths"
                        placeholder="Months"
                        value={skillsData.experienceMonths}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="popup-buttons mt-16 flex gap-7">
                    <button className='px-3 py-2 border rounded-lg bg-zinc-100' onClick={handleCancel}>Cancel</button>
                    <button className='px-6 py-2 border rounded-lg bg-blue-500 text-white hover:bg-blue-600' onClick={handleSaves}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default SkillsForm;
