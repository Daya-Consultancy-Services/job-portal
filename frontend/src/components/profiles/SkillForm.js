
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { createSkillProfiles, updateSkillProfiles } from '../../operations/skillprofileAPI';

const SkillsForm = ({ onSave, editMode = false, initialSkill = null,  skillId = null }) => {
  const [skillsData, setSkillsData] = useState({
    skillName: editMode && initialSkill ? initialSkill.skillName : '',
    experience: editMode && initialSkill ? initialSkill.experience: '',
  });

//   console.log("skill id", skillId)
  const { token } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSkillsData({ ...skillsData, [name]: value });
  };

  const handleSave = () => {
    if (editMode) {
      // Update existing skill
      dispatch(updateSkillProfiles(token, skillId ,{ 
        ...skillsData, 
        index: initialSkill.index 
      }));
    } else {
      // Create new skill
      dispatch(createSkillProfiles(token, skillsData));
    }
    onSave(skillsData);
  };

  const handleCancel = () => {
    onSave(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center h-full w-full">
      <div className="popup-content min-h-[450px] w-[700px] bg-white relative top-[30px] pl-10 pt-10 rounded-xl">
        <button
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
          onClick={handleCancel}
        >
          <X size={24} className="text-gray-600" />
        </button>

        <h2 className='text-3xl font-bold'>
          {editMode ? 'Edit IT Skill' : 'Add IT Skill'}
        </h2>

        <div className="skill-name flex flex-col mt-10">
          <label htmlFor="skillName" className='text-xl font-semibold'>Skill Name: </label>
          <input
            className='border w-[90%] p-2 mt-2 bg-zinc-100 rounded-lg'
            type="text"
            name="skillName"
            placeholder="Skill Name"
            value={skillsData.skillName}
            onChange={handleInputChange}
          />
        </div>

        <div className="experience flex flex-col mt-6">
          <label htmlFor="experienceYears" className='text-2xl font-semibold'>Experience: </label>
          <input
            className='border w-[90%] p-2 mt-2 bg-zinc-100 rounded-lg'
            type="number"
            name="experience"
            placeholder="Years"
            value={skillsData.experience}
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
            {editMode ? 'Update' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;