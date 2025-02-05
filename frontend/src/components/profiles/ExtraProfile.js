

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { personalDetails, updatePersonaldetails, deletePersonaldetails } from "../../operations/personaldetailAPI";

const ExtraProfile = ({ onSave, isEdit, initialData = null }) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.profile);
    
    const [formData, setFormData] = useState({
        gender: "",
        dateOfBirth: "",
        martialStatus: "",
        permanentAddress: "",
        pincode: "",
        language: [],
        address: "",
    });
    
    const [newLang, setNewLang] = useState("");

    useEffect(() => {
        if (isEdit && initialData) {
            setFormData(initialData);
        }
    }, [isEdit, initialData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const addLang = () => {
        if (newLang.trim() && !formData.language.includes(newLang)) {
            setFormData({
                ...formData,
                language: [...formData.language, newLang]
            });
            setNewLang("");
        }
    };

    const removeLangs = (langToRemove) => {
        setFormData({
            ...formData,
            language: formData.language.filter((lang) => lang !== langToRemove)
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                dispatch(updatePersonaldetails(token, formData));
                toast.success("Personal details updated successfully!");
            } else {
                dispatch(personalDetails(
                    token,
                    formData.gender,
                    formData.dateOfBirth,
                    formData.martialStatus,
                    formData.permanentAddress,
                    formData.pincode,
                    formData.language,
                    formData.address
                ));
                toast.success("Personal details created successfully!");
            }
            onSave(formData);
        } catch (error) {
            console.error("Operation failed", error);
            toast.error("An error occurred while saving details.");
        }
    };

    const handleReset = () => {
        try {
            dispatch(deletePersonaldetails(token));
            toast.success("Personal details reset successfully!");
            setFormData({
                gender: "",
                dateOfBirth: "",
                martialStatus: "",
                permanentAddress: "",
                pincode: "",
                language: [],
                address: "",
            });
        } catch (error) {
            console.error("Reset failed", error);
            toast.error("An error occurred while resetting details.");
        }
    };

    const handleCancel = () => {
        onSave(null);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center h-full w-full z-[9999999999]">
            <div className="popup-content min-h-[500px] w-[600px] bg-white relative p-6 rounded-lg overflow-y-auto ">
                <h2 className="text-xl font-bold mb-4">
                    {isEdit ? "Edit Profile Details" : "Add Profile Details"}
                </h2>

                <form className="flex flex-col gap-4" onSubmit={handleSave}>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Gender</label>
                        <select
                            name="gender"
                            className="border w-full p-2 bg-zinc-50 rounded-md text-sm"
                            value={formData.gender}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            className="border w-full p-2 bg-zinc-50 rounded-md text-sm"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Martial Status</label>
                        <select
                            name="martialStatus"
                            className="border w-full p-2 bg-zinc-50 rounded-md text-sm"
                            value={formData.martialStatus}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Martial Status</option>
                            <option value="married">Married</option>
                            <option value="unmarried">Unmarried</option>
                            <option value="student">Student</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Permanent Address</label>
                        <textarea
                            name="permanentAddress"
                            rows={2}
                            className="border w-full p-2 bg-zinc-50 rounded-md text-sm"
                            value={formData.permanentAddress}
                            onChange={handleInputChange}
                            placeholder="Enter permanent address"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Pincode</label>
                        <input
                            type="number"
                            name="pincode"
                            className="border w-full p-2 bg-zinc-50 rounded-md text-sm"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            placeholder="Enter pincode"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Languages</label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={newLang}
                                placeholder="Enter a language"
                                className="flex-1 p-2 border bg-zinc-50 rounded-md text-sm"
                                onChange={(e) => setNewLang(e.target.value)}
                            />
                            <button
                                type="button"
                                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
                                onClick={addLang}
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.language.map((lang, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-1 bg-zinc-100 px-2 py-1 rounded-full text-sm"
                                >
                                    <span>{lang}</span>
                                    <button
                                        type="button"
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => removeLangs(lang)}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Current Address</label>
                        <textarea
                            name="address"
                            rows={2}
                            className="border w-full p-2 bg-zinc-50 rounded-md text-sm"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Enter current address"
                        />
                    </div>

                    <div className="flex gap-3 mt-4">
                        <button
                            type="button"
                            className="px-3 py-1.5 border rounded-md bg-zinc-50 text-sm"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-1.5 border rounded-md bg-blue-500 text-white hover:bg-blue-600 text-sm"
                        >
                            {isEdit ? "Update" : "Save"}
                        </button>
                        <button
                            type="button"
                            className="px-3 py-1.5 border rounded-md bg-red-500 text-white hover:bg-red-600 text-sm"
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExtraProfile;
