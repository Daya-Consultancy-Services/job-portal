import React from 'react';
import { User, Mail, MapPin, Calendar } from 'lucide-react';

const Profile = () => {
  const profileData = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Senior Full-stack Developer",
    location: "San Francisco, CA",
    joinDate: "Joined April 2023",
    description: "Full-stack developer with 5 years of experience in React and Node.js. Passionate about building user-friendly applications and solving complex problems.",
    imageUrl: null,
    stats: [
      { label: "Projects", value: "45+" },
      { label: "Experience", value: "5 yrs" },
      { label: "Rating", value: "4.9" }
    ]
  };

  return (
    <div className="p-4">
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - Profile Image & Basic Info */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              {/* Profile Image */}
              <div className="relative group">
                {profileData.imageUrl ? (
                  <img
                    src={profileData.imageUrl}
                    alt="Profile"
                    className="w-32 h-32 rounded-xl object-cover shadow-lg ring-4 ring-white"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg ring-4 ring-white">
                    <User className="w-16 h-16 text-white" />
                  </div>
                )}
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-3 w-full mt-4">
                {profileData.stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="bg-white p-3 rounded-lg shadow-sm text-center border border-gray-100 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="text-lg font-bold text-gray-800">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-1">{profileData.name}</h2>
                <p className="text-lg text-blue-600 font-medium mb-4">{profileData.role}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{profileData.joinDate}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">About</h3>
                <p className="text-gray-600 leading-relaxed">{profileData.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;