import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"; 

import {  deletePersonaldetails, personalDetails, updatePersonaldetails } from "../../operations/personaldetailAPI";



function ExtraProfile() {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.profile); // Get current user info from the Redux store
    const {token} = useSelector((state) => state.profile);
    const [language, setLangs] = useState(user.skills || []);
    const [newLang, setNewLang] = useState("");
    const [gender, setGender] = useState(user.gender || "");
    const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth || "");
    const [martialStatus, setMartialStatus] = useState(user.martialStatus || "");
    const [permanentAddress, setPermanentAddress] = useState(user.permanentAddress || "");
    const [pincode, setPincode] = useState(user.pincode || "");
    const [address, setAddress] = useState(user.address || "");
    const [counter, setCounter] = useState(1); 
    // const [workStatus, setWorkStatus] = useState(user.workStatus || "");



    const addLang = () => {
        if (newLang.trim() && !language.includes(newLang)) {
            setLangs([...language, newLang]);
            setNewLang("");
        }
    };

    const removeLangs = (langToRemove) => {
        setLangs(language.filter((language) => language !== langToRemove));
    };

    const handleSave = (e) => {
        e.preventDefault();
        const personalDetailsData = {
            gender,
            dateOfBirth,
            martialStatus,
            permanentAddress,
            pincode,
            language,
            address,
        };

        try {
            if (counter == 1) {
                // Create personal details when counter is 1
                dispatch(
                    personalDetails(
                        token,
                        gender,
                        dateOfBirth,
                        martialStatus,
                        permanentAddress,
                        pincode,
                        language,
                        address,
                    )
                );
                toast.success("Personal details created successfully!");
                alert("Details created successfully!");
            } else {
                
                dispatch(
                    updatePersonaldetails(
                        token,
                       personalDetailsData
                    )
                );
                toast.success("Personal details updated successfully!");
                alert("Details updated successfully!");
            }
        } catch (error) {
            console.error("Update failed", error);
            toast.error("An error occurred while saving details.");
        }

        // Increment the counter after handling the form submission
        setCounter((prev) => prev + 1);
    };

    const handleReset = () => {
        try {
            dispatch(deletePersonaldetails(token));
            alert("rest successful")
            toast.success("Personal details reset successfully!");
            // Reset local state
            setGender("");
            setDateOfBirth("");
            setMartialStatus("");
            setPermanentAddress("");
            setPincode("");
            setLangs([]);
            setAddress("");
        } catch (error) {
            console.error("Reset failed", error);
            toast.error("An error occurred while resetting details.");
        }
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
                            defaultValue={user?.profile?.personalDetails?.gender}
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
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
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
                        <input value={pincode} onChange={(e) => setPincode(e.target.value)} type="number" className="w-full px-3 py-2 border rounded" />
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
                            {language.map((lang, index) => (
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
                    <div>
                        <label className="block font-medium mb-1"> Address</label>
                        <textarea
                            rows={3}
                            placeholder="Enter address"
                            className="w-full px-3 py-2 border rounded resize-none"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
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
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-red-600"
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ExtraProfile;
