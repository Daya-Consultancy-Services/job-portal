
import React from 'react';

const ProfileWithProgressRing = ({ 
  imageUrl, 
  handleImageUpload, 
  completedFields ,
  totalFields = 10 
}) => {

  // Calculate completion percentage
  const completionPercentage = (completedFields.length / totalFields) * 100;
 
  // Circle parameters
  const size = 150; // Match the original size from your first snippet
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;
 
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* SVG for the progress ring */}
      <svg width={size} height={size} className="absolute top-0 left-0">
        {/* Background circle */}
        <circle
          cx={size/2}
          cy={size/2}
          r={radius}
          fill="transparent"
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
        />
       
        {/* Progress circle */}
        <circle
          cx={size/2}
          cy={size/2}
          r={radius}
          fill="transparent"
          stroke="#4caf50"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
        />
      </svg>
     
      {/* Profile image with upload overlay */}
      <div className="absolute inset-0 m-2 rounded-full overflow-hidden group">
        <img 
          className="h-full w-full object-cover" 
          src={imageUrl || require("../assets/default-profile.jpg")} 
          alt="Profile" 
        />
        
        {/* Overlay for Upload */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <label
            htmlFor="imageUpload"
            className="text-white text-sm rounded cursor-pointer"
          >
            Upload Image
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>
      
      {/* Optional: Display completion percentage */}
      <div className="absolute bottom-0 right-0 bg-white rounded-full px-2 py-1 text-xs font-medium border border-gray-200">
        {completionPercentage.toFixed(0)}%
      </div>
    </div>
  );
};

export default ProfileWithProgressRing;