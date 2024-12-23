import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"; 
import { updateProfile } from "../../operations/userAPI";

function ExtraProfile({ token }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user); // Get current user info from the Redux store

    const [skills, setSkills] = useState(user.skills || []);
    const [newSkill, setNewSkill] = useState("");
    const [gender, setGender] = useState(user.gender || "");
    const [dob, setDob] = useState(user.dob || "");
    const [contact, setContact] = useState(user.contact || "");
    const [workStatus, setWorkStatus] = useState(user.workStatus || "");


    const addSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill)) {
            setSkills([...skills, newSkill]);
            setNewSkill("");
        }
    };

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter((skill) => skill !== skillToRemove));
    };

    const handleSave = async (e) => {
        alert("data is going to be update")

        e.preventDefault();
        console.log(token);
        
        const formData = {
            gender,
            dob,
            contact,
            workStatus,
            skills,
        };
        dispatch(updateProfile(token, formData)); 


      
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[99999]">
            <div className="bg-white w-[40%] p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSave}>
                    <div>
                        <label className="block font-medium mb-1">Gender</label>
                        <select
                            className="w-full px-3 py-2 border rounded"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Date of Birth</label>
                        <input
                            type="date"
                            className="w-full px-3 py-2 border rounded"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Contact Number</label>
                        <input
                            type="text"
                            placeholder="Enter contact number"
                            className="w-full px-3 py-2 border rounded"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Work Status</label>
                        <select
                            className="w-full px-3 py-2 border rounded"
                            value={workStatus}
                            onChange={(e) => setWorkStatus(e.target.value)}
                        >
                            <option value="">Select Work Status</option>
                            <option value="employed">Employed</option>
                            <option value="student">Student</option>
                            <option value="unemployed">Unemployed</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Skills</label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={newSkill}
                                placeholder="Enter a skill"
                                className="flex-1 px-3 py-2 border rounded"
                                onChange={(e) => setNewSkill(e.target.value)}
                            />
                            <button
                                type="button"
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                onClick={addSkill}
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-full"
                                >
                                    <span>{skill}</span>
                                    <button
                                        type="button"
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => removeSkill(skill)}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            onClick={() => window.location.reload()}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ExtraProfile;
