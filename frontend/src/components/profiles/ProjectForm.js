import React, { useState } from 'react';

const ProjectForm = ({ onSave }) => {
    const [projectData, setProjectData] = useState({
        title: '',
        role: '',
        technologies: [],
        duration: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProjectData({ ...projectData, [name]: value });
    };

    const handleTechnologiesChange = (e) => {
        const value = e.target.value;
        setProjectData(prev => ({
            ...prev,
            technologies: value.split(',').map(tech => tech.trim())
        }));
    };

    const handleSaves = () => {
        onSave(projectData); // Pass the project data to the onSave prop
    };

    const handleCancel = () => {
        onSave(null); // Pass null to indicate cancel
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center h-full w-full">
            <div className="popup-content min-h-[700px] w-[800px] bg-white relative top-[30px] pl-10 pt-10">
                <h2 className='text-3xl font-bold'>Project Details</h2>
                <div className="title flex flex-col mt-10">
                    <label htmlFor="title" className='text-2xl font-semibold'>Title: </label>
                    <input
                        className='border w-[70%] p-2 mt-2 bg-zinc-100 rounded-lg'
                        type="text"
                        name="title"
                        placeholder="Project Title"
                        value={projectData.title}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="role flex flex-col mt-6">
                    <label htmlFor="role" className='text-2xl font-semibold'>Role: </label>
                    <input
                        className='border w-[70%] p-2 mt-2 bg-zinc-100 rounded-lg'
                        type="text"
                        name="role"
                        placeholder="Your Role in the Project"
                        value={projectData.role}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="technologies flex flex-col mt-6">
                    <label htmlFor="technologies" className='text-2xl font-semibold'>Technologies Used: </label>
                    <input
                        className='border w-[70%] p-2 mt-2 bg-zinc-100 rounded-lg'
                        type="text"
                        name="technologies"
                        placeholder="Comma separated technologies (e.g. React, Node.js, MongoDB)"
                        value={projectData.technologies.join(', ')}
                        onChange={handleTechnologiesChange}
                    />
                </div>

                <div className="duration flex flex-col mt-6">
                    <label htmlFor="duration" className='text-2xl font-semibold'>Duration: </label>
                    <input
                        className='border w-[70%] p-2 mt-2 bg-zinc-100 rounded-lg'
                        type="text"
                        name="duration"
                        placeholder="Project Duration"
                        value={projectData.duration}
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

export default ProjectForm;
