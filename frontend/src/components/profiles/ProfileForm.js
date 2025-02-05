import React from "react";
import { FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../operations/profileAPI";

const ProfileForm = ({ isOpen, onClose, onSave, popupType, initialValue }) => {
  const { register, handleSubmit } = useForm(
    {
      defaultValues: {
        [popupType]: initialValue || "", 
      },
    }
  );
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user)
  const handleSave = (data) => {
    try{
      console.log(token);

      dispatch(updateProfile(token, data));
      onSave(data);
      onClose();
    }catch(error){
      console.log(error.message)
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[600px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-zinc-500 text-xl"
        >
          <FaTimes />
        </button>
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form
          onSubmit={handleSubmit(handleSave)}
          className="flex flex-col gap-4"
        >
          <div>
            <label htmlFor="about" className="block text-sm font-medium text-gray-700">
              About
            </label>
            <textarea
              id="about"
              placeholder="Enter About"
              {...register("about", { required: true })}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              id="contactNumber"
              type="text"
              placeholder="Enter Contact Number"
              {...register("contactNumber", { required: true })}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
              Upload Resume
            </label>
            <input
              id="resume"
              type="text"
              {...register("resume", { required: true })}
              accept=".pdf,.doc,.docx"
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="resumeHeadline" className="block text-sm font-medium text-gray-700">
              Resume Headline
            </label>
            <input
              id="resumeHeadline"
              type="text"
              placeholder="Enter Resume Headline"
              {...register("resumeHeadline", { required: true })}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="profileSummary" className="block text-sm font-medium text-gray-700">
              Profile Summary
            </label>
            <textarea
              id="profileSummary"
              placeholder="Enter Profile Summary"
              {...register("profileSummary", { required: true })}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              id="location"
              type="text"
              placeholder="Enter Location"
              {...register("location", { required: true })}
              className="border p-2 rounded w-full"
            />
          </div>
          {/* <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              image
            </label>
            <input
              id="image"
              type="file"
              placeholder="Enter image"
              {...register("image", { required: true })}
              className="border p-2 rounded w-full"
            />
          </div> */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-zinc-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
