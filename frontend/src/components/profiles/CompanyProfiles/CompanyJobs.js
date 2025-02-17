import React, { useState } from 'react';

function CompanyJobs() {
  // Sample jobs data
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "San Francisco, CA (Remote Available)",
      description: "Join our engineering team to build modern web applications that millions of users love.",
      requirements: ["5+ years React experience", "Strong TypeScript skills", "Experience with state management"],
      postedDate: "2025-02-10",
      recruiter: {
        name: "Alex Morgan",
        avatar: "/api/placeholder/48/48",
        email: "alex.morgan@company.com"
      }
    },
    {
      id: 2,
      title: "Product Marketing Manager",
      department: "Marketing",
      location: "New York, NY",
      description: "Drive our product marketing strategy and help us connect with our target audience effectively.",
      requirements: ["3+ years in SaaS marketing", "Experience with market research", "Strong presentation skills"],
      postedDate: "2025-02-14", 
      recruiter: {
        name: "Sam Taylor",
        avatar: "/api/placeholder/48/48",
        email: "sam.taylor@company.com"
      }
    },
    {
      id: 3,
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Austin, TX (Remote Available)",
      description: "Help us build and maintain our cloud infrastructure and deployment pipelines.",
      requirements: ["Experience with AWS/GCP", "Knowledge of Kubernetes", "CI/CD pipeline expertise"],
      postedDate: "2025-02-05",
      recruiter: {
        name: "Jordan Lee",
        avatar: "/api/placeholder/48/48",
        email: "jordan.lee@company.com"
      }
    },
    {
      id: 4,
      title: "UX Designer",
      department: "Design",
      location: "Seattle, WA",
      description: "Create beautiful and intuitive user experiences for our flagship products.",
      requirements: ["Portfolio demonstrating UX expertise", "Proficiency in Figma", "User research experience"],
      postedDate: "2025-02-12",
      recruiter: {
        name: "Casey Rivera",
        avatar: "/api/placeholder/48/48",
        email: "casey.rivera@company.com"
      }
    }
  ]);

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen pb-16 w-full">
      <header className="bg-white shadow-md py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-blue-500">Open Positions</h1>
        </div>
      </header>

      <main className="max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="space-y-6">
          {jobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 "
            >
              <div className="flex md:flex">
                <div className="flex-1 md:flex-1 p-6">
                  <div className="flex flex-wrap items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 mr-3">{job.title}</h2>
                  </div>
                  
                  <div className="flex items-center mb-4 text-gray-600">
                    <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{job.location}</span>
                    <span className="mx-3 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">Posted on {formatDate(job.postedDate)}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{job.description}</p>
                  
                  {/* Requirements */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Requirements:</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Recruiter section */}
                <div className="bg-gray-50 md:w-64 p-6 border-t md:border-t-0 md:border-l border-gray-100 flex md:flex-col md:justify-center items-center md:items-start">
                 
                  <div className="ml-4 md:ml-0 md:mt-4">
                    <p className="text-sm font-medium text-gray-800">Posted by:</p>
                    <p className="text-base font-semibold text-blue-500 mt-1">{job.recruiter.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{job.recruiter.email}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default CompanyJobs;