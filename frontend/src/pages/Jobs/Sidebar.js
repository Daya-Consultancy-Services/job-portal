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
  console.log("jobs",jobs);
  const labels1 = ['Full-time', 'Part-time', 'Freelance', 'Internship', 'Remote', 'On-site', 'Temporary', 'Contract'];
  const labels2 = ['Full day', 'Flexible Schedule', 'Shift work', 'Distant work', 'Shift method'];
  const labels3 = ['1.5 lakh to 3 lakh', '3 lakh to 7 lakh', '7 lakh to 10 lakh', '10+ lakh'];

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
    console.log(jobs);
    const selectedWorkingSchedule = workingSchedule.map((checked, index) => (checked ? labels1[index] : null)).filter(Boolean);
    const selectedEmploymentType = employmentType.map((checked, index) => (checked ? labels2[index] : null)).filter(Boolean);
    const selectedSalaryRange = salaryRange.map((checked, index) => (checked ? labels3[index] : null)).filter(Boolean);

    const filtered = jobs.filter((job) => {
      const matchesSchedule = selectedWorkingSchedule.length === 0 || selectedWorkingSchedule.includes(job.workingSchedule);
      const matchesEmployment = selectedEmploymentType.length === 0 || selectedEmploymentType.includes(job.employmentType);
      const matchesSalary = selectedSalaryRange.length === 0 || selectedSalaryRange.includes(job.salary);
      return matchesSchedule && matchesEmployment && matchesSalary;
    });
    

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