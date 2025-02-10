import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Users } from 'lucide-react';
import { useDispatch } from 'react-redux';

const RecruiterManagement = () => {
  const [recruiters, setRecruiters] = useState([]);

  const [newRecruiter, setNewRecruiter] = useState({ name: "", email: "", password: "", contactNumber: "", description: ""});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState([]);

  const dispatch = useDispatch();



  useEffect(() => {
    let timer;
    if (showAlert) {
      timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showAlert]);

  const handleAddRecruiter = () => {
    if (!newRecruiter.name || !newRecruiter.email || !newRecruiter.password || !newRecruiter.contactNumber || !newRecruiter.description) {
      setAlertMessage("Please fill in all recruiter fields");
      setShowAlert(true);
      return;
    }

    const newRecruiterData = {
      ...newRecruiter,
    };


    // Update both recruiters and formData
    setRecruiters(prevRecruiters => [...prevRecruiters, newRecruiterData]);
    setFormData(prevFormData => [...prevFormData, newRecruiterData]);

    // Log the formData to see the collected data
    console.log('Updated FormData:', [...formData, newRecruiterData]);

    dispatch(formdata);

    setNewRecruiter({ name: "", email: "", password: "", contactNumber: "", description: ""});
    setAlertMessage("Recruiter added successfully");
    setShowAlert(true);
  };

  const handleDeleteRecruiter = (id) => {
    setRecruiters(prevRecruiters => prevRecruiters.filter(recruiter => recruiter.id !== id));
    setFormData(prevFormData => prevFormData.filter(data => data.id !== id));
    setAlertMessage("Recruiter deleted successfully");
    setShowAlert(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md w-[60%]">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Users className="h-6 w-6" />
          Recruiters Management
        </h2>
      </div>
      <div className="p-6">
        {showAlert && (
          <div className={`mb-4 p-4 rounded-lg bg-blue-50 text-blue-700`}>
            {alertMessage}
          </div>
        )}

        <div className="space-y-6">
          {/* Add New Recruiter Form */}
          <div className="flex gap-4 items-end">
            <div className="flex-1 space-y-2">
              <input
                type="text"
                placeholder="Recruiter Name"
                value={newRecruiter.name}
                onChange={(e) => setNewRecruiter({ ...newRecruiter, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Recruiter Email"
                value={newRecruiter.email}
                onChange={(e) => setNewRecruiter({ ...newRecruiter, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="password"
                placeholder='Enter password' 
                value={newRecruiter.password} 
                onChange={(e) => setNewRecruiter({...newRecruiter, password: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="number"
                placeholder='Enter your number' 
                value={newRecruiter.contactNumber} 
                onChange={(e) => setNewRecruiter({...newRecruiter, contactNumber: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="text"
                placeholder='Enter the description' 
                value={newRecruiter.description} 
                onChange={(e) => setNewRecruiter({...newRecruiter, description: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleAddRecruiter}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Add Recruiter
            </button>
          </div>

          {/* Recruiters List */}
          <div className="space-y-4">
            {recruiters.map((recruiter) => (
              <div
                key={recruiter.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="space-y-1 flex-1">
                  <h4 className="font-medium">{recruiter.name}</h4>
                  <p className="text-sm text-gray-600">Email: {recruiter.email}</p>
                  <p className="text-sm text-gray-600">Password: {recruiter.password}</p>
                  <p className="text-sm text-gray-600">Contact: {recruiter.contactNumber}</p>
                  <p className="text-sm text-gray-600">Description: {recruiter.description}</p>
                </div>
                <button
                  onClick={() => handleDeleteRecruiter(recruiter.id)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center gap-2 h-10"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterManagement;