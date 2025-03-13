import React, { useState, useRef, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { Users, Briefcase, Clock, Filter, ChevronDown, Search, Bell, User, Target, TrendingUp, Award, BarChart2, Camera } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdmin, logout, uploadImage } from '../../../operations/adminapi';
import { Link, useNavigate } from 'react-router-dom';
import Companies from '../../../pages/Admin/Companies';


// Sample data
const jobPostingData = [
  { month: 'Jan', count: 45 },
  { month: 'Feb', count: 52 },
  { month: 'Mar', count: 49 },
  { month: 'Apr', count: 63 },
  { month: 'May', count: 59 },
  { month: 'Jun', count: 68 }
];

const applicationsData = [
  { month: 'Jan', count: 320 },
  { month: 'Feb', count: 380 },
  { month: 'Mar', count: 410 },
  { month: 'Apr', count: 480 },
  { month: 'May', count: 520 },
  { month: 'Jun', count: 570 }
];

const jobCategoryData = [
  { name: 'Technology', value: 35 },
  { name: 'Finance', value: 20 },
  { name: 'Healthcare', value: 15 },
  { name: 'Marketing', value: 12 },
  { name: 'Education', value: 10 },
  { name: 'Other', value: 8 }
];

// New recruitment funnel data
const recruitmentFunnelData = [
  { stage: 'Applications', count: 1482 },
  { stage: 'Screening', count: 745 },
  { stage: 'Interviews', count: 386 },
  { stage: 'Offers', count: 112 },
  { stage: 'Hires', count: 84 }
];

// New hiring source data
const hiringSourceData = [
  { source: 'LinkedIn', value: 42 },
  { source: 'Job Boards', value: 28 },
  { source: 'Referrals', value: 18 },
  { source: 'Company Site', value: 12 }
];

// New candidate experience data
const candidateExperienceData = [
  { month: 'Jan', score: 4.2 },
  { month: 'Feb', score: 4.3 },
  { month: 'Mar', score: 4.1 },
  { month: 'Apr', score: 4.4 },
  { month: 'May', score: 4.5 },
  { month: 'Jun', score: 4.6 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const recentApplications = [
  { id: 1, name: 'Alex Johnson', position: 'Senior Developer', date: '2025-02-24', status: 'Pending' },
  { id: 2, name: 'Maria Garcia', position: 'UX Designer', date: '2025-02-23', status: 'Interviewed' },
  { id: 3, name: 'David Chen', position: 'Data Analyst', date: '2025-02-22', status: 'Pending' },
  { id: 4, name: 'Sarah Williams', position: 'Marketing Manager', date: '2025-02-22', status: 'Rejected' },
  { id: 5, name: 'James Taylor', position: 'Backend Developer', date: '2025-02-21', status: 'Shortlisted' }
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedKpiView, setSelectedKpiView] = useState('funnel');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileImage, setProfileImage] = useState('/api/placeholder/80/80');
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const token = useSelector((state)=>state.admin.token);
  const admin = useSelector((state)=>state.admin.admin);





  // KPI metrics
  const kpiMetrics = {
    averageCostPerHire: '$4,250',
    timeToFill: '18 days',
    offerAcceptanceRate: '86%',
    candidateExperienceScore: '4.6/5',
    qualityOfHire: '92%'
  };

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleFileChange = async(e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("file", file);
      try{
        await dispatch(uploadImage(token, file));
      }catch(e){
        console.log("error uploading profile image", e);
      }
    }
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout(navigate));
  }

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-800"><img
                src={require('../../../assets/logo.png')}
                className="h-[85px] w-[85px] relative top-[3px]"
                alt="Logo"
              /></h1>
          
          </div>
          <div className="flex items-center space-x-6">
            {/* <button className="text-gray-500 hover:text-gray-700">
              <Search className="h-5 w-5" />
            </button>
            <button className="text-gray-500 hover:text-gray-700 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button> */}
            <div className="relative">
              <button onClick={handleProfileClick} className="flex items-center space-x-2">
                <div className="relative group w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  <img src={admin.image || require("../../../assets/default-profile.jpg")} alt="Admin profile" className="w-full h-full object-cover" />
                </div>
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-lg py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex justify-center mb-3">
                      <div className="relative group w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                        <img src={admin.image} alt="Admin profile" className="w-full h-full object-cover" />
                        <div 
                          onClick={triggerFileInput} 
                          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <Camera className="h-6 w-6 text-white" />
                        </div>
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleFileChange} 
                          accept="image/*" 
                          className="hidden" 
                        />
                      </div>
                    </div>
                    <p className="text-center text-sm text-gray-500 mb-1">Change profile picture</p>
                    <p className="text-center font-medium">{admin.name}</p>
                    <p className="text-center text-sm text-gray-500">{admin.email}</p>
                  </div>
                  <div className="px-2 py-2">
                    {/* <span  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Your Profile</span>
                    <span  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Settings</span> */}
                    {/* <span  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Help & Support</span> */}
                    <div className="border-t border-gray-100 my-1"></div>
                    <span onClick={handleLogout}  className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 rounded-md cursor-pointer">Sign out</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        {/* Navigation */}
        <nav className="flex space-x-6 mb-6 overflow-x-auto">
          <button 
            className={`px-2 py-2 text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`px-2 py-2 text-sm font-medium transition-colors ${activeTab === 'jobs' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('companies')}
          >
            Companies
          </button>
          <button 
            className={`px-2 py-2 text-sm font-medium transition-colors ${activeTab === 'applications' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('applications')}
          >
            Applications
          </button>
          <button 
            className={`px-2 py-2 text-sm font-medium transition-colors ${activeTab === 'users' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button 
            className={`px-2 py-2 text-sm font-medium transition-colors ${activeTab === 'reports' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('reports')}
          >
            Reports
          </button>
          <button 
            className={`px-2 py-2 text-sm font-medium transition-colors ${activeTab === 'analytics' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
        </nav>

 {/* Conditional Rendering of Different Sections */}
 {activeTab === 'dashboard' && (
          <>
         
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Jobs</p>
                <h3 className="text-2xl font-bold text-gray-800">246</h3>
                <p className="text-xs text-green-500">+12% from last month</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">New Applicants</p>
                <h3 className="text-2xl font-bold text-gray-800">1,482</h3>
                <p className="text-xs text-green-500">+8% from last month</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Time to Hire</p>
                <h3 className="text-2xl font-bold text-gray-800">18 days</h3>
                <p className="text-xs text-red-500">+2 days from last month</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Filter className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                <h3 className="text-2xl font-bold text-gray-800">12.4%</h3>
                <p className="text-xs text-green-500">+1.2% from last month</p>
              </div>
            </div>
          </div>
        </div>

  
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recruitment Analytics</h2>
            <div className="flex space-x-2">
              <button 
                className={`px-3 py-1 text-sm rounded-md ${selectedKpiView === 'funnel' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setSelectedKpiView('funnel')}
              >
                Funnel
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md ${selectedKpiView === 'sources' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setSelectedKpiView('sources')}
              >
                Sources
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md ${selectedKpiView === 'experience' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setSelectedKpiView('experience')}
              >
                Experience
              </button>
            </div>
          </div>
          
          {/* KPI Metrics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <div className="bg-gray-50 rounded p-3">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-500" />
                <p className="text-xs text-gray-500">Cost Per Hire</p>
              </div>
              <p className="text-lg font-bold mt-1">{kpiMetrics.averageCostPerHire}</p>
            </div>
            <div className="bg-gray-50 rounded p-3">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <p className="text-xs text-gray-500">Time to Fill</p>
              </div>
              <p className="text-lg font-bold mt-1">{kpiMetrics.timeToFill}</p>
            </div>
            <div className="bg-gray-50 rounded p-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <p className="text-xs text-gray-500">Offer Acceptance</p>
              </div>
              <p className="text-lg font-bold mt-1">{kpiMetrics.offerAcceptanceRate}</p>
            </div>
            <div className="bg-gray-50 rounded p-3">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-blue-500" />
                <p className="text-xs text-gray-500">Quality of Hire</p>
              </div>
              <p className="text-lg font-bold mt-1">{kpiMetrics.qualityOfHire}</p>
            </div>
            <div className="bg-gray-50 rounded p-3">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-500" />
                <p className="text-xs text-gray-500">Candidate Score</p>
              </div>
              <p className="text-lg font-bold mt-1">{kpiMetrics.candidateExperienceScore}</p>
            </div>
          </div>
          
          {/* KPI Visualization */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              {selectedKpiView === 'funnel' && (
                <BarChart
                  layout="vertical"
                  data={recruitmentFunnelData}
                  margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="stage" type="category" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                </BarChart>
              )}
              {selectedKpiView === 'sources' && (
                <PieChart>
                  <Pie
                    data={hiringSourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ source, percent }) => `${source} ${(percent * 100).toFixed(0)}%`}
                  >
                    {hiringSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              )}
              {selectedKpiView === 'experience' && (
                <AreaChart data={candidateExperienceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Area type="monotone" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Job Applications</h2>
              <div className="flex items-center space-x-2">
                <button className="text-sm font-medium text-gray-500 hover:text-gray-700">
                  Monthly
                </button>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={applicationsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Job Categories</h2>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={jobCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {jobCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Job Postings</h2>
              <div className="flex items-center space-x-2">
                <button className="text-sm font-medium text-gray-500 hover:text-gray-700">
                  Last 6 Months
                </button>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={jobPostingData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Applications</h2>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentApplications.map((application) => (
                    <tr key={application.id}>
                      <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-800">{application.name}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">{application.position}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">{application.date}</td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          application.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          application.status === 'Interviewed' ? 'bg-blue-100 text-blue-800' :
                          application.status === 'Shortlisted' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {application.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
          </>
        )}

        {activeTab === 'companies' && (
          <Companies />
        )}

        {activeTab === 'candidates' && (
          <div>Candidates Content</div>
        )}

        {activeTab === 'reports' && (
          <div>Reports Content</div>
        )}

      </div>
    </div>
  );
};

export default Admin;