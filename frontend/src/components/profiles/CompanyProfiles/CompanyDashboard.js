import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import CompanyHeader from './CompanyHeader';
import HomeHeader from '../../../pages/home/Header';

import { fetchCompanyJobs } from '../../../operations/companyAPI';
import { fetchRecruiter } from '../../../operations/recruiterAPI';

const CompanyAnalyticsDashboard = () => {
  const dispatch = useDispatch();
  
  // Get company details and token from Redux store
  const company = useSelector((state) => state.company.company);
  const token = useSelector((state) => state.company.token);
  const recruiters = useSelector((state) => state.company.recruiters) || [];
  const allJobs = useSelector((state) => state.company.allJobs) || [];


  console.log("Redux State:", { company, token, recruiters, allJobs });
  
  // State for data
  const [jobPostData, setJobPostData] = useState([]);
  const [applicationData, setApplicationData] = useState([]);
  const [monthlyApplications, setMonthlyApplications] = useState([]);
  const [departmentStats, setDepartmentStats] = useState([]);
  const [recruiterPerformanceData, setRecruiterPerformanceData] = useState([]);
  const [overallStats, setOverallStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    totalHires: 0,
    applicationToHireRatio: '0.0'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for filters
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [activeTab, setActiveTab] = useState('recruiters');

  // Fetch data when component mounts
  useEffect(() => {
    if (token) {
      setIsLoading(true);
      setError(null);
      
      // Fetch both jobs and recruiters data
      Promise.all([
        dispatch(fetchCompanyJobs(token)),
        dispatch(fetchRecruiter(token))
      ])
      .catch(err => {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
    } else {
      setError("Authentication token not found. Please log in again.");
    }
  }, [dispatch, token]);

  // Process data when components mounts or when data changes
  useEffect(() => {
    if (recruiters?.length > 0 && allJobs?.length > 0) {
      console.log("Processing data with:", { recruitersCount: recruiters.length, jobsCount: allJobs.length });
      processData();
    } else {
      console.log("Waiting for data to be loaded:", { recruiters, allJobs });
    }
  }, [recruiters, allJobs, company]);

  const processData = () => {
    try {
      // Process job post data
      const processedJobPostData = recruiters.map(recruiter => {
        const recruiterJobs = allJobs.filter(job => job.recruiterId._id === recruiter._id);

        const activeJobs = recruiterJobs.filter(job => job.status === 'active').length;
        const filledJobs = recruiterJobs.filter(job => job.status === 'filled').length;
        
        return {
          recruiterId: recruiter._id,
          name: recruiter.name,
          jobsPosted: recruiterJobs.length,
          activeJobs,
          filledJobs
        };
      });
      setJobPostData(processedJobPostData);

      // Process application data (this would need to be adapted to your actual data structure)
      // Assuming each job has an applications array
      const processedApplicationData = recruiters.map(recruiter => {
        const recruiterJobs = allJobs.filter(job => job.recruiterId === recruiter._id);
        const applications = recruiterJobs.flatMap(job => job.applications || []);
        const shortlisted = applications.filter(app => app.status === 'shortlisted').length;
        const interviewed = applications.filter(app => app.status === 'interviewed').length;
        const hired = applications.filter(app => app.status === 'hired').length;
        
        return {
          recruiterId: recruiter._id,
          name: recruiter.name,
          totalApplications: applications.length,
          shortlisted,
          interviewed,
          hired
        };
      });
      setApplicationData(processedApplicationData);

      // Process monthly applications
      // Assuming each application has a createdAt date
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const currentDate = new Date();
      const monthlyData = [];

      // Get data for last 6 months
      for (let i = 5; i >= 0; i--) {
        const month = new Date(currentDate);
        month.setMonth(currentDate.getMonth() - i);
        const monthName = monthNames[month.getMonth()];
        const monthYear = month.getFullYear();
        
        const monthApplications = allJobs.flatMap(job => 
          (job.applications || []).filter(app => {
            if (!app.createdAt) return false;
            const appDate = new Date(app.createdAt);
            return appDate.getMonth() === month.getMonth() && appDate.getFullYear() === monthYear;
          })
        );
        
        const hires = monthApplications.filter(app => app.status === 'hired').length;
        
        monthlyData.push({
          month: monthName,
          applications: monthApplications.length,
          hires
        });
      }
      setMonthlyApplications(monthlyData);

      // Process department statistics
      // Assuming each job has a department field
      const departments = [...new Set(allJobs.map(job => job.department).filter(Boolean))];
      const departmentData = departments.map(dept => {
        const deptJobs = allJobs.filter(job => job.department === dept);
        const applications = deptJobs.flatMap(job => job.applications || []);
        const hires = applications.filter(app => app.status === 'hired').length;
        
        return {
          department: dept || 'Uncategorized',
          jobs: deptJobs.length,
          applications: applications.length,
          hires
        };
      });
      setDepartmentStats(departmentData);

      // Combine recruiter data for display
      const combinedRecruiterData = recruiters.map(recruiter => {
        const jobData = processedJobPostData.find(j => j.recruiterId === recruiter._id) || 
          { jobsPosted: 0, activeJobs: 0, filledJobs: 0 };
        
        const appData = processedApplicationData.find(a => a.recruiterId === recruiter._id) || 
          { totalApplications: 0, shortlisted: 0, interviewed: 0, hired: 0 };
        
        return {
          id: recruiter._id,
          name: recruiter.name,
          department: recruiter.department || 'Uncategorized',
          jobsPosted: jobData.jobsPosted,
          activeJobs: jobData.activeJobs,
          filledJobs: jobData.filledJobs,
          totalApplications: appData.totalApplications,
          shortlisted: appData.shortlisted,
          interviewed: appData.interviewed,
          hired: appData.hired,
          conversionRate: appData.totalApplications > 0 
            ? ((appData.hired / appData.totalApplications) * 100).toFixed(1)
            : '0.0'
        };
      });
      setRecruiterPerformanceData(combinedRecruiterData);

      // Calculate overall company stats
      const totalJobs = allJobs.length;
      const totalApplications = allJobs.reduce((sum, job) => sum + (job.applications?.length || 0), 0);
      const totalHires = allJobs.reduce((sum, job) => 
        sum + (job.applications?.filter(app => app.status === 'hired').length || 0), 0);
      const applicationToHireRatio = totalHires > 0 
        ? (totalApplications / totalHires).toFixed(1)
        : '0.0';
      
      setOverallStats({
        totalJobs,
        totalApplications,
        totalHires,
        applicationToHireRatio
      });

      console.log("Data processing complete.");
    } catch (error) {
      console.error("Error processing data:", error);
      setError("Error processing analytics data. Please check console for details.");
    }
  };

  // Filter data based on selected department
  const filteredRecruiters = selectedDepartment === 'All' 
    ? recruiterPerformanceData 
    : recruiterPerformanceData.filter(r => r.department === selectedDepartment);

  // Get unique departments for filter dropdown
  const departments = [...new Set(recruiters.map(r => r.department).filter(Boolean))];

  // Color constants
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9370DB'];

  // Loading state
  if (isLoading) {
    return (
      <>
        <HomeHeader/>
        <div className="flex flex-col w-full max-w-6xl mx-auto p-4 space-y-6 relative top-24">
          <div className="border rounded p-4 shadow-sm text-center py-8">
            <p className="text-lg text-gray-500">Loading analytics data...</p>
          </div>
        </div>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <HomeHeader/>
        <div className="flex flex-col w-full max-w-6xl mx-auto p-4 space-y-6 relative top-24">
          <div className="border rounded p-4 shadow-sm text-center py-8 bg-red-50">
            <p className="text-lg text-red-600">{error}</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  // No data state
  if (!recruiters?.length || !allJobs?.length) {
    return (
      <>
        <HomeHeader/>
        <div className="flex flex-col w-full max-w-6xl mx-auto p-4 space-y-6 relative top-24">
          <div className="border rounded p-4 shadow-sm text-center py-8">
            <p className="text-lg text-gray-500">
              No data available. Please ensure recruiters and jobs are added to your company profile.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
    <HomeHeader/>
    <div className="flex flex-col w-full max-w-6xl mx-auto p-4 space-y-6 relative top-24">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {company?.name || 'Company'} Recruitment Analytics
        </h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Department:</span>
          <select 
            value={selectedDepartment} 
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="All">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept || 'Uncategorized'}</option>
            ))}
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
            <p className="text-3xl font-bold">{overallStats.totalJobs}</p>
          </div>
        </div>
        <div className="border rounded p-4 shadow-sm">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Total Applications</p>
            <p className="text-3xl font-bold">{overallStats.totalApplications}</p>
          </div>
        </div>
        <div className="border rounded p-4 shadow-sm">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Applications per Hire</p>
            <p className="text-3xl font-bold">{overallStats.applicationToHireRatio}:1</p>
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
          <div className="flex flex-col md:flex-row">
            <div className="h-80 w-full md:w-1/2">
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
            <div className="h-80 w-full md:w-1/2 mt-4 md:mt-0">
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
                  applications: overallStats.totalApplications,
                  shortlisted: applicationData.reduce((sum, item) => sum + item.shortlisted, 0),
                  interviewed: applicationData.reduce((sum, item) => sum + item.interviewed, 0),
                  hired: overallStats.totalHires
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