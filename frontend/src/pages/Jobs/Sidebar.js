import React, { useState } from 'react';
import tick from '../../assets/tick.png';

// Reusable Checkbox Component
const Checkbox = ({ label, isChecked, onClick }) => {
  return (
    <label className="flex items-center gap-2">
      <div
        onClick={onClick}
        className={`w-4 h-4 border-2 rounded-full flex items-center justify-center cursor-pointer ${isChecked ? 'border-blue-500' : 'border-gray-500'}`}
      >
        {isChecked && (
          <div
            className="w-full h-full bg-center bg-cover"
            style={{ backgroundImage: `url(${tick})` }}
          />
        )}
      </div>
      <span>{label}</span>
    </label>
  );
};

// Reusable Filter Section Component
const FilterSection = ({ title, labels, state, onToggle }) => {
  return (
    <div className="mt-6">
      <h2 className="font-medium text-gray-500 mb-2">{title}</h2>
      <div className="flex flex-col gap-2">
        {labels.map((label, index) => (
          <Checkbox
            key={index}
            label={label}
            isChecked={state[index]}
            onClick={() => onToggle(index)}
          />
        ))}
      </div>
    </div>
  );
};

function Sidebar({ jobs, setFilteredList }) {
  console.log("jobs", jobs);
  const labels1 = ['Full-time', 'Part-time', 'Freelance', 'Internship', 'Remote', 'On-site', 'Temporary', 'Contract'];
  const labels2 = ['Full day', 'Flexible Schedule', 'Shift work', 'Distant work', 'Shift method'];
  const labels3 = ['1.5 lakh to 3 lakh', '3 lakh to 7 lakh', '7 lakh to 10 lakh', '10+ lakh'];

  // Map job types to our filter options
  const jobTypeToWorkingSchedule = {
    'it': 'Full-time', // Mapping example - update with your actual mappings
    'software': 'Full-time',
    'part-time': 'Part-time',
    'remote': 'Remote',
    // Add more mappings as needed
  };

  const jobTypeToEmploymentType = {
    'it': 'Full day', // Mapping example - update with your actual mappings
    'software': 'Full day',
    'shift': 'Shift work',
    'flexible': 'Flexible Schedule',
    // Add more mappings as needed
  };

  // Helper function to convert salary string to a range
  const getSalaryRange = (salaryStr) => {
    if (!salaryStr) return null;
    
    const numValue = parseFloat(salaryStr.replace(/[^0-9.]/g, ''));
    
    if (numValue <= 3) return '1.5 lakh to 3 lakh';
    if (numValue <= 7) return '3 lakh to 7 lakh';
    if (numValue <= 10) return '7 lakh to 10 lakh';
    return '10+ lakh';
  };

  const [workingSchedule, setWorkingSchedule] = useState(Array(labels1.length).fill(false));
  const [employmentType, setEmploymentType] = useState(Array(labels2.length).fill(false));
  const [salaryRange, setSalaryRange] = useState(Array(labels3.length).fill(false));

  const handleToggle = (index, type) => {
    const updateState = (state) => {
      const updatedState = [...state];
      updatedState[index] = !updatedState[index];
      return updatedState;
    };

    if (type === 'workingSchedule') {
      setWorkingSchedule(updateState(workingSchedule));
    } else if (type === 'employmentType') {
      setEmploymentType(updateState(employmentType));
    } else if (type === 'salaryRange') {
      setSalaryRange(updateState(salaryRange));
    }
  };

  const applyFilters = () => {
    // Get selected filter values
    const selectedWorkingSchedule = workingSchedule.map((checked, index) => (checked ? labels1[index] : null)).filter(Boolean);
    const selectedEmploymentType = employmentType.map((checked, index) => (checked ? labels2[index] : null)).filter(Boolean);
    const selectedSalaryRange = salaryRange.map((checked, index) => (checked ? labels3[index] : null)).filter(Boolean);

    // Filter jobs based on selected filters
    const filtered = jobs.filter((job) => {
      // Map job properties to our filter categories
      const jobWorkingSchedule = jobTypeToWorkingSchedule[job.jobType?.toLowerCase()] || null;
      const jobEmploymentType = jobTypeToEmploymentType[job.jobType?.toLowerCase()] || null;
      const jobSalaryRangeCategory = getSalaryRange(job.salaryRange);

      // Check if job matches the selected filters
      const matchesSchedule = selectedWorkingSchedule.length === 0 || 
        (jobWorkingSchedule && selectedWorkingSchedule.includes(jobWorkingSchedule));
      
      const matchesEmployment = selectedEmploymentType.length === 0 || 
        (jobEmploymentType && selectedEmploymentType.includes(jobEmploymentType));
      
      const matchesSalary = selectedSalaryRange.length === 0 || 
        (jobSalaryRangeCategory && selectedSalaryRange.includes(jobSalaryRangeCategory));

      return matchesSchedule && matchesEmployment && matchesSalary;
    });
    
    console.log("Filtered jobs:", filtered);
    setFilteredList(filtered);
  };

  return (
    <div className="sticky top-[85px] h-fit w-[95%] p-4 shadow-md">
      <div className="border-b border-gray-400 pb-2">
        <h1 className="text-2xl font-semibold">Filters</h1>
      </div>

      <FilterSection
        title="Working Schedule"
        labels={labels1}
        state={workingSchedule}
        onToggle={(index) => handleToggle(index, 'workingSchedule')}
      />

      <FilterSection
        title="Employment Type"
        labels={labels2}
        state={employmentType}
        onToggle={(index) => handleToggle(index, 'employmentType')}
      />

      <FilterSection
        title="Salary"
        labels={labels3}
        state={salaryRange}
        onToggle={(index) => handleToggle(index, 'salaryRange')}
      />

      <div className="mt-7">
        <button
          onClick={applyFilters}
          className="px-7 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default Sidebar;