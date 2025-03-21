import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import CompanyHeader from './CompanyHeader';

const CompanyAnalyticsDashboard = () => {
  // Mock data - this would come from your API in a real application
  const recruiters = [
    { id: 1, name: 'Sarah Johnson', department: 'Engineering' },
    { id: 2, name: 'Mike Chen', department: 'Marketing' },
    { id: 3, name: 'Priya Patel', department: 'Product' },
    { id: 4, name: 'David Lee', department: 'Sales' },
    { id: 5, name: 'Emma Wilson', department: 'HR' }
  ];
  
  const jobPostData = [
    { recruiterId: 1, jobsPosted: 12, activeJobs: 5, filledJobs: 7 },
    { recruiterId: 2, jobsPosted: 8, activeJobs: 3, filledJobs: 5 },
    { recruiterId: 3, jobsPosted: 15, activeJobs: 9, filledJobs: 6 },
    { recruiterId: 4, jobsPosted: 10, activeJobs: 2, filledJobs: 8 },
    { recruiterId: 5, jobsPosted: 6, activeJobs: 4, filledJobs: 2 }
  ];

  const applicationData = [
    { recruiterId: 1, totalApplications: 187, shortlisted: 45, interviewed: 22, hired: 7 },
    { recruiterId: 2, totalApplications: 124, shortlisted: 35, interviewed: 18, hired: 5 },
    { recruiterId: 3, totalApplications: 213, shortlisted: 57, interviewed: 25, hired: 6 },
    { recruiterId: 4, totalApplications: 156, shortlisted: 38, interviewed: 16, hired: 8 },
    { recruiterId: 5, totalApplications: 92, shortlisted: 28, interviewed: 10, hired: 2 }
  ];

  const monthlyApplications = [
    { month: 'Jan', applications: 120, hires: 8 },
    { month: 'Feb', applications: 145, hires: 10 },
    { month: 'Mar', applications: 168, hires: 12 },
    { month: 'Apr', applications: 142, hires: 9 },
    { month: 'May', applications: 187, hires: 14 },
    { month: 'Jun', applications: 205, hires: 16 }
  ];

  const departmentStats = [
    { department: 'Engineering', jobs: 23, applications: 356, hires: 14 },
    { department: 'Marketing', jobs: 12, applications: 198, hires: 8 },
    { department: 'Product', jobs: 17, applications: 287, hires: 11 },
    { department: 'Sales', jobs: 14, applications: 224, hires: 10 },
    { department: 'HR', jobs: 8, applications: 107, hires: 5 }
  ];

  // Combine recruiter data for display
  const recruiterPerformanceData = recruiters.map(recruiter => {
    const jobData = jobPostData.find(j => j.recruiterId === recruiter.id) || { jobsPosted: 0, activeJobs: 0, filledJobs: 0 };
    const appData = applicationData.find(a => a.recruiterId === recruiter.id) || { totalApplications: 0, shortlisted: 0, interviewed: 0, hired: 0 };
    
    return {
      id: recruiter.id,
      name: recruiter.name,
      department: recruiter.department,
      jobsPosted: jobData.jobsPosted,
      activeJobs: jobData.activeJobs,
      filledJobs: jobData.filledJobs,
      totalApplications: appData.totalApplications,
      shortlisted: appData.shortlisted,
      interviewed: appData.interviewed,
      hired: appData.hired,
      conversionRate: ((appData.hired / appData.totalApplications) * 100).toFixed(1)
    };
  });

  // Overall company stats
  const totalJobs = jobPostData.reduce((sum, item) => sum + item.jobsPosted, 0);
  const totalApplications = applicationData.reduce((sum, item) => sum + item.totalApplications, 0);
  const totalHires = applicationData.reduce((sum, item) => sum + item.hired, 0);
  
  // Calculate application to hire ratio
  const applicationToHireRatio = (totalApplications / totalHires).toFixed(1);

  // Color constants
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9370DB'];

  // State for filters
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [activeTab, setActiveTab] = useState('recruiters');

  // Filter data based on selected department
  const filteredRecruiters = selectedDepartment === 'All' 
    ? recruiterPerformanceData 
    : recruiterPerformanceData.filter(r => r.department === selectedDepartment);

  return (
    <>
    <CompanyHeader/>
    <div className="flex flex-col w-full max-w-6xl mx-auto p-4 space-y-6 relative top-24">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Company Recruitment Analytics</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Department:</span>
          <select 
            value={selectedDepartment} 
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Product">Product</option>
            <option value="Sales">Sales</option>
            <option value="HR">HR</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="border rounded p-4 shadow-sm">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Total Recruiters</p>
            <p className="text-3xl font-bold">{recruiters.length}</p>
          </div>
        </div>
        <div className="border rounded p-4 shadow-sm">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Total Job Postings</p>
            <p className="text-3xl font-bold">{totalJobs}</p>
          </div>
        </div>
        <div className="border rounded p-4 shadow-sm">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Total Applications</p>
            <p className="text-3xl font-bold">{totalApplications}</p>
          </div>
        </div>
        <div className="border rounded p-4 shadow-sm">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Applications per Hire</p>
            <p className="text-3xl font-bold">{applicationToHireRatio}:1</p>
          </div>
        </div>
      </div>

      {/* Custom Tabs */}
      <div className="border-b">
        <div className="flex">
          <button 
            className={`px-4 py-2 ${activeTab === 'recruiters' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('recruiters')}
          >
            Recruiter Performance
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'applications' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('applications')}
          >
            Applications Trend
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'departments' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('departments')}
          >
            Department Stats
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'funnel' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('funnel')}
          >
            Recruitment Funnel
          </button>
        </div>
      </div>
      
      {/* Recruiter Performance Tab */}
      {activeTab === 'recruiters' && (
        <div className="border rounded p-4 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Recruiter Performance</h2>
            <p className="text-sm text-gray-500">
              Compare job postings and applications managed by each recruiter
            </p>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredRecruiters}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="jobsPosted" name="Jobs Posted" fill="#8884d8" />
                <Bar yAxisId="right" dataKey="totalApplications" name="Applications" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      
      {/* Applications Trend Tab */}
      {activeTab === 'applications' && (
        <div className="border rounded p-4 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Monthly Application Trends</h2>
            <p className="text-sm text-gray-500">
              View how application volume has changed over time
            </p>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyApplications}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="applications" name="Applications" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                <Area type="monotone" dataKey="hires" name="Hires" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      
      {/* Department Stats Tab */}
      {activeTab === 'departments' && (
        <div className="border rounded p-4 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Department Statistics</h2>
            <p className="text-sm text-gray-500">
              Compare hiring activity across departments
            </p>
          </div>
          <div className="flex">
            <div className="h-80 w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    dataKey="applications"
                    nameKey="department"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {departmentStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="h-80 w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={departmentStats}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="department" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="jobs" name="Jobs Posted" fill="#8884d8" />
                  <Bar dataKey="hires" name="Hires" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
      
      {/* Recruitment Funnel Tab */}
      {activeTab === 'funnel' && (
        <div className="border rounded p-4 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Recruitment Funnel</h2>
            <p className="text-sm text-gray-500">
              Visualize the candidate journey from application to hire
            </p>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[{
                  name: 'Funnel',
                  applications: totalApplications,
                  shortlisted: applicationData.reduce((sum, item) => sum + item.shortlisted, 0),
                  interviewed: applicationData.reduce((sum, item) => sum + item.interviewed, 0),
                  hired: totalHires
                }]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="applications" name="Total Applications" fill="#8884d8" />
                <Bar dataKey="shortlisted" name="Shortlisted" fill="#82ca9d" />
                <Bar dataKey="interviewed" name="Interviewed" fill="#ffc658" />
                <Bar dataKey="hired" name="Hired" fill="#ff8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
    </>
    
  );
};

export default CompanyAnalyticsDashboard;