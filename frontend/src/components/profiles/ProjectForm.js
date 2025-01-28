import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createProjects, updateProject, updateProjects } from '../../operations/projectAPI';
import { Pencil, Trash2 } from 'lucide-react';

const ProjectForm = ({ onSave, isEdit, initialData }) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.profile);
    const [projectData, setProjectData] = useState({
        projectTitle: '',
        projectLink: '',
        projectDescription: '',
        projectSkills: ''
    });

    useEffect(() => {
        if (isEdit && initialData) {
            setProjectData(initialData);
        }
    }, [isEdit, initialData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProjectData({ ...projectData, [name]: value });
    };

    const handleSave = () => {
        if (isEdit) {
            dispatch(updateProjects(token, initialData._id, projectData));
        } else {
            dispatch(createProjects(token, projectData));
        }
        onSave(projectData);
    };

    const handleCancel = () => {
        onSave(null);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center h-full w-full">
            <div className="popup-content min-h-[700px] w-[800px] bg-white relative top-[30px] pl-10 pt-10">
                <h2 className='text-3xl font-bold'>{isEdit ? 'Edit Project' : 'Add New Project'}</h2>
                
                <div className="title flex flex-col mt-10">
                    <label htmlFor="projectTitle" className='text-2xl font-semibold'>Project Title: </label>
                    <input
                        className='border w-[70%] p-2 mt-2 bg-zinc-100 rounded-lg'
                        type="text"
                        name="projectTitle"
                        placeholder="Enter project title"
                        value={projectData.projectTitle}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="link flex flex-col mt-6">
                    <label htmlFor="projectLink" className='text-2xl font-semibold'>Project Link: </label>
                    <input
                        className='border w-[70%] p-2 mt-2 bg-zinc-100 rounded-lg'
                        type="text"
                        name="projectLink"
                        placeholder="Enter project link"
                        value={projectData.projectLink}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="description flex flex-col mt-6">
                    <label htmlFor="projectDescription" className='text-2xl font-semibold'>Project Description: </label>
                    <textarea
                        className='border w-[70%] p-2 mt-2 bg-zinc-100 rounded-lg min-h-[100px]'
                        name="projectDescription"
                        placeholder="Enter project description"
                        value={projectData.projectDescription}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="skills flex flex-col mt-6">
                    <label htmlFor="projectSkills" className='text-2xl font-semibold'>Project Skills: </label>
                    <input
                        className='border w-[70%] p-2 mt-2 bg-zinc-100 rounded-lg'
                        type="text"
                        name="projectSkills"
                        placeholder="Enter skills (e.g. React, Node.js, MongoDB)"
                        value={projectData.projectSkills}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="popup-buttons mt-16 flex gap-7">
                    <button 
                        className='px-3 py-2 border rounded-lg bg-zinc-100' 
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button 
                        className='px-6 py-2 border rounded-lg bg-blue-500 text-white hover:bg-blue-600' 
                        onClick={handleSave}
                    >
                        {isEdit ? 'Update' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectForm;