

import React, { useState } from 'react';
import tick from '../../assets/tick.png';

// Reusable Checkbox Component
const Checkbox = ({ label, isChecked, onClick }) => (
  <label className="flex items-center gap-2">
    <div
      onClick={onClick}
      className={`w-4 h-4 border-2 rounded-md flex items-center justify-center cursor-pointer ${
        isChecked ? 'border-blue-500' : 'border-gray-500'
      }`}
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

// Reusable Filter Section Component
const FilterSection = ({ title, labels, state, onToggle }) => (
  <div className="mt-6">
    <h2 className="font-medium text-zinc-500 mb-2">{title}</h2>
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

function Sidebar({ company, setCompFilteredList }) {
  const labels = {
    companyType: ['Corporate', 'Foreign MNC', 'Indian MNC', 'Startup'],
    location: [
      'Bengaluru',
      'Delhi / NCR',
      'Mumbai (All Areas)',
      'Hyderabad',
      'Pune',
      'Chennai',
      'Kolkata',
      'Gurugram',
    ],
    industry: [
      'IT Services & Consulting',
      'Software Product',
      'Medical Services / Hospital',
      'Industrial Equipment / Machinery',
      'Education / Training',
      'Pharmaceutical & Life Sciences',
      'Internet',
      'Engineering & Construction',
      'Financial Services',
      'Real Estate',
    ],
    department: [
      'Engineering - Software & QA',
      'Sales & Business Development',
      'Finance & Accounting',
      'Customer Success, Service & Operations',
      'Human Resources',
      'Marketing & Communication',
      'Production, Manufacturing & Engineering',
      'Data Science & Analytics',
      'IT & Information Security',
      'Project & Program Management',
    ],
    experience: ['Experienced', 'Entry level'],
    businessNature: ['B2B', 'B2C', 'SaaS', 'D2C', 'PaaS'],
    postingDate: ['<7 Days', '<15 Days'],
  };

  const [filterState, setFilterState] = useState(
    Object.fromEntries(
      Object.keys(labels).map((key) => [key, Array(labels[key].length).fill(false)])
    )
  );

  const handleToggle = (filterType, index) => {
    setFilterState((prev) => ({
      ...prev,
      [filterType]: prev[filterType].map((val, i) => (i === index ? !val : val)),
    }));
  };

  const applyFilters = () => {
    const selectedFilters = Object.entries(filterState).reduce((acc, [key, state]) => {
      acc[key] = state
        .map((isSelected, index) => (isSelected ? labels[key][index] : null))
        .filter(Boolean);
      return acc;
    }, {});

    const filteredCompany = company.filter((comp) =>
      Object.entries(selectedFilters).every(([key, values]) =>
        values.length === 0 || values.includes(comp[key])
      )
    );

    setCompFilteredList(filteredCompany);
  };

  return (
    <div className="sticky top-[85px] h-fit w-[95%] p-4 shadow-md bg-white rounded-lg">
      <div className="border-b border-gray-400 pb-2">
        <h1 className="text-2xl font-semibold">Filters</h1>
      </div>

      {Object.keys(labels).map((key) => (
        <FilterSection
          key={key}
          title={key.replace(/([A-Z])/g, ' $1')}
          labels={labels[key]}
          state={filterState[key]}
          onToggle={(index) => handleToggle(key, index)}
        />
      ))}

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



