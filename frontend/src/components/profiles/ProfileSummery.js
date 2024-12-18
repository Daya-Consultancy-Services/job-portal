import React, { useState } from 'react';

const ProfileSummery = ({ onSave, initialDetails }) => {
    const [details, setDetails] = useState(initialDetails || ''); // Initialize with existing details if available

    const handleInputChange = (e) => {
        setDetails(e.target.value); // Update details state
    };

    const handleSave = () => {
        onSave(details); // Pass the details back to the parent component
    };

    const handleCancel = () => {
        onSave(null); // Pass null to indicate cancel
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center h-full w-full">
            <div className="popup-content min-h-[500px] w-[700px] bg-white relative top-[30px] pl-10 pt-10">
                <h2 className='text-3xl font-bold'>Personal Details</h2>
                <div className="textarea mt-10 flex flex-col">
                    <label htmlFor="details" className='text-2xl font-semibold'>Details:</label>
                    <textarea
                        id="details"
                        className='border w-[90%] p-4 mt-2 bg-zinc-100 rounded-lg resize-none'
                        rows="6"
                        placeholder="Write about yourself..."
                        value={details}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="popup-buttons mt-10 flex gap-7">
                    <button className='px-3 py-2 border rounded-lg bg-zinc-100' onClick={handleCancel}>
                        Cancel
                    </button>
                    <button
                        className='px-6 py-2 border rounded-lg bg-blue-500 text-white hover:bg-blue-600'
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileSummery;
