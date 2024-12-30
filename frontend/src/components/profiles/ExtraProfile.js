import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"; 
import { updateDetail } from "../../operations/userAPI";

function ExtraProfile({ token }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user); // Get current user info from the Redux store

    const [langs, setLangs] = useState(user.skills || []);
    const [newLang, setNewLang] = useState("");
    const [gender, setGender] = useState(user.gender || "");
    const [dob, setDob] = useState(user.dob || "");
    const [martialStatus, setMartialStatus] = useState(user.martialStatus || "");
    const [permanentAddress, setPermanentAddress] = useState(user.permanentAddress || "");
    // const [contact, setContact] = useState(user.contact || "");
    const [workStatus, setWorkStatus] = useState(user.workStatus || "");


    const addLang = () => {
        if (newLang.trim() && !langs.includes(newLang)) {
            setLangs([...langs, newLang]);
            setNewLang("");
        }
    };

    const removeLangs = (langToRemove) => {
        setLangs(langs.filter((lang) => lang !== langToRemove));
    };

    const handleSave = async (e) => {
        alert("data is going to be update")

        e.preventDefault();
        console.log(token);
        
        const formData = {
            gender,
            dob,
            martialStatus,
            // contact,
            permanentAddress,
            workStatus,
            langs,
        };
        dispatch(updateDetail(token, formData)); 


      
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
                    {/* <div>
                        <label className="block font-medium mb-1">Contact Number</label>
                        <input
                            type="text"
                            placeholder="Enter contact number"
                            className="w-full px-3 py-2 border rounded"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                        />
                    </div> */}
                   <div>
                        <label className="block font-medium mb-1">Martial Status</label>
                        <select
                            className="w-full px-3 py-2 border rounded"
                            value={martialStatus}
                            onChange={(e) => setMartialStatus(e.target.value)}
                        >
                            <option value="">Select Martial Status</option>
                            <option value="male">Married</option>
                            <option value="female">Unmarried</option>
                            <option value="other">Student</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Permanent Address</label>
                        <textarea
                            rows={3}
                            placeholder="Enter permanent address"
                            className="w-full px-3 py-2 border rounded resize-none"
                            value={permanentAddress}
                            onChange={(e) => setPermanentAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Pincode</label>
                        <input type="number" className="w-full px-3 py-2 border rounded" />
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
                        <label className="block font-medium mb-1">Languages</label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={newLang}
                                placeholder="Enter a skill"
                                className="flex-1 px-3 py-2 border rounded"
                                onChange={(e) => setNewLang(e.target.value)}
                            />
                            <button
                                type="button"
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                onClick={addLang}
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {langs.map((lang, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-full"
                                >
                                    <span>{lang}</span>
                                    <button
                                        type="button"
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => removeLangs(lang)}
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
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-orange-600"
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
