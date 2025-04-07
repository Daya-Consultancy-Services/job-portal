import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { adminfetchAllCompany } from '../../operations/adminapi';
import { Info, MapPin, Briefcase, BarChart2, User, Building, ArrowLeft } from 'lucide-react';

function AdminCompanyProfile() {
  const { companyId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const token = useSelector((state) => state.admin.token);
  const companies = useSelector((state) => state.admin.allCompany);
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        // If companies aren't loaded yet, fetch them
        if (!companies || companies.length === 0) {
          await dispatch(adminfetchAllCompany(token));
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch company details');
        setLoading(false);
      }
    };
    
    fetchCompanyData();
  }, [dispatch, token, companies]);
  
  useEffect(() => {
    // Find the company that matches the ID from params
    if (companies && companies.length > 0 && companyId) {
      const company = companies.find(company => company._id === companyId);
      setSelectedCompany(company);
    }
  }, [companies, companyId]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }
  
  if (!selectedCompany) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="text-gray-400 text-5xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Company Not Found</h2>
          <p className="text-gray-600">The company you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 onClick={()=> navigate(-1)} className=" cursor-pointer text-xl font-bold text-gray-800"><img
                src={require('../../assets/logo.png')}
                className="h-[85px] w-[85px] relative top-[3px]"
                alt="Logo"
              /></h1>
          
          </div>
          <div className="flex items-center space-x-6">
         
          </div>
        </div>
      </header>
      </div>
      
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Company header section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
                <div className="absolute -bottom-16 left-8">
                  <div className="h-32 w-32 rounded-xl overflow-hidden border-4 border-white shadow-md bg-white">
                    <img
                      src={selectedCompany.logo || require('../../assets/default-profile.jpg')}
                      alt={`${selectedCompany.name} logo`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-20 pb-8 px-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800">{selectedCompany.name}</h1>
                    <p className="text-gray-600">{selectedCompany.email}</p>
                    {selectedCompany.website && (
                      <a
                        href={selectedCompany.website.startsWith('http')
                          ? selectedCompany.website
                          : `https://${selectedCompany.website}`}
                        className="text-blue-500 hover:text-blue-700 transition"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {selectedCompany.website}
                      </a>
                    )}
                  </div>
                  <div className="flex flex-col items-end">
                    <div className={`text-sm font-medium px-3 py-1 rounded-full ${selectedCompany.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {selectedCompany.isBlocked ? 'Blocked' : 'Active'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left column */}
              <div className="md:col-span-2">
                {/* About section */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Info className="h-5 w-5 mr-2 text-blue-500" />
                    About
                  </h2>
                  <p className="text-gray-700">
                    {selectedCompany.description || "No description available."}
                  </p>
                </div>
                
                {/* Location section */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                    Location
                  </h2>
                  <p className="text-gray-700">
                    {selectedCompany.location || "No location specified."}
                  </p>
                </div>
                
                {/* Industry/Field section */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-blue-500" />
                    Industry
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompany.companyfield && selectedCompany.companyfield.length > 0 ? (
                      selectedCompany.companyfield.map((field, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {field}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">No industry specified</span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Right column - Stats and details */}
              <div>
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <BarChart2 className="h-5 w-5 mr-2 text-blue-500" />
                    Company Stats
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">Job Tokens</div>
                      <div className="text-2xl font-bold text-blue-600">{selectedCompany.jobToken || 0}</div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">User Detail Access Count</div>
                      <div className="text-2xl font-bold text-blue-600">{selectedCompany.userDetailAccessCount || 0}</div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">Recruiters</div>
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedCompany.recruiter ? selectedCompany.recruiter.length : 0}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-blue-500" />
                    Company ID
                  </h2>
                  <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm font-mono text-gray-800">{selectedCompany._id}</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCompanyProfile;