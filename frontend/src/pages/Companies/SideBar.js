import React, { useState } from 'react';
import tick from '../../assets/tick.png';




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

function SideBar({company, setCompFilteredList}) {
  const labels1 = [
    'Corporate',
    'Foreign MNC',
    'Inndian MNC',
    'Satrtup',
   
  ];

  const labels2 = [
    'Bengaluru',
    'Delhi / NCR',
    'Mumbai (All Areas)',
    'Hyderabad',
   'Pune',
    'Chennai',
    'Bangalore',
    'Kolkata',
    'Mumbai',
    'Gurugram'
  ];

  const labels3 = [
    'IT Services & Consulting',
    'Software Product',
    'Medical Services / Hospital',
    'Industrial Equipment / Machinery',
    'Education / Training',
     'Pharmaceutical & Life Sciences',
     'Internet',
     'Engineering & Construction',
     'Financial Services',
     'Real Estate'
  ];
  
  const labels4 = [
    'Engineering - Software & QA ',
    'Sales & Business Development',
    'Finance & Accounnting',
    'Customer Success, Service & Operations',
    'Human Resources',
     'Marketing & Communication',
     'Production, Manufacturing & Engineering',
     'Data Science & Analytics',
     'IT & Information Security',
     'Project & Program Management'
  ];
  const labels5 = [
   'Experienced',
   'Entry level'
  ];
  const labels6 = [
   'B2B',
   'B2C',
   'SaaS',
   'D2C',
   'PaaS'
  ];
  const labels7 = [
   '<7 Days',
   '<15 Days'
  ];
  const [companyType, setCompanyType] = useState(
    Array(labels1.length).fill(false)
  );

  const [location, setLocation] = useState(
    Array(labels2.length).fill(false)
  );

  const [department, setDepartment] = useState(
    Array(labels4.length).fill(false)
  );
  
  const [industry, setIndustry] = useState(
    Array(labels3.length).fill(false)
  );
  const [experience, setExperience] = useState(
    Array(labels5.length).fill(false)
  );
  const [natureOfBusiness, setNatureOfBusiness] = useState(
    Array(labels6.length).fill(false)
  );
  const [jobpostingdate, setJobPostingDate] = useState(
    Array(labels7.length).fill(false)
  );

 const handleCheckboxClick = (index, type) => {
  if (type === 'companytype') {
    const updatedState = [...companyType];
    updatedState[index] = !updatedState[index];
    setCompanyType(updatedState);
  } else if (type === 'location') {
    const updatedState = [...location];
    updatedState[index] = !updatedState[index];
    setLocation(updatedState);
  } else if (type === 'industry') {
    const updatedState = [...industry];
    updatedState[index] = !updatedState[index];
    setIndustry(updatedState);
  } else if (type === 'department') {
    const updatedState = [...department];
    updatedState[index] = !updatedState[index];
    setDepartment(updatedState);
  } else if (type === 'experience') {
    const updatedState = [...experience];
    updatedState[index] = !updatedState[index];
    setExperience(updatedState);
  } else if (type === 'natureofbusiness') { // Fixed typo
    const updatedState = [...natureOfBusiness];
    updatedState[index] = !updatedState[index];
    setNatureOfBusiness(updatedState);
  } else if (type === 'jobpostingdate') { // Fixed typo
    const updatedState = [...jobpostingdate];
    updatedState[index] = !updatedState[index];
    setJobPostingDate(updatedState);
  }
};

  const checkboxStyle = (isChecked) => ({
    width: '16px',
    overflow: 'hidden',
    height: '16px',
    border: `2px solid ${isChecked ? '#007bff' : '#555'}`,
    borderRadius: '5%',
    backgroundColor: 'transparent',
    appearance: 'none',
    cursor: 'pointer',
    position: 'relative',
    display: 'inline-block',
  });

  const checkedIndicatorStyle = (isChecked) => ({
    width: '16px',
    height: '16px',
    backgroundImage: isChecked ? `url(${tick})` : 'none',
    backgroundSize: 'cover',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  });

  const applyCompFilters = () => {
    console.log(company);
    const selectedWorkingSchedule = workingSchedule.map((checked, index) => (checked ? labels1[index] : null)).filter(Boolean);
    const selectedEmploymentType = employmentType.map((checked, index) => (checked ? labels2[index] : null)).filter(Boolean);
    const selectedSalaryRange = salaryRange.map((checked, index) => (checked ? labels3[index] : null)).filter(Boolean);

    const filtered = company.filter((comp) => {
      const matchesSchedule = selectedWorkingSchedule.length === 0 || selectedWorkingSchedule.includes(comp.workingSchedule);
      const matchesEmployment = selectedEmploymentType.length === 0 || selectedEmploymentType.includes(comp.employmentType);
      const matchesSalary = selectedSalaryRange.length === 0 || selectedSalaryRange.includes(comp.salary);
      return matchesSchedule && matchesEmployment && matchesSalary;
    });
    

    setCompFilteredList(filtered);
  };

  return (
    <div className="sticky top-[85px] h-fit w-[95%] p-4 shadow-md bg-white rounded-lg">
      <div className="side-head border-b-[0.2px] border-gray-400 pb-[7px]">
        <h1 className="text-2xl font-semibold">Filters</h1>
      </div>

      <div className="filter-1 mt-6">
        <h2 className="font-medium text-zinc-500 mb-2">Company type</h2>
        <div className="flex flex-col gap-2">
          {labels1.map((label, index) => (
            <label key={index} className="flex items-center gap-2">
              <div
                onClick={() => handleCheckboxClick(index, 'companytype')}
                style={checkboxStyle(companyType[index])}
              >
                {companyType[index] && (
                  <div style={checkedIndicatorStyle(true)} />
                )}
              </div>
              {label}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-2 mt-6">
        <h2 className="font-medium text-zinc-500 mb-2">Location</h2>
        <div className="flex flex-col gap-2">
          {labels2.map((label, index) => (
            <label key={index} className="flex items-center gap-2">
              <div
                onClick={() => handleCheckboxClick(index, 'location')}
                style={checkboxStyle(location[index])}
              >
                {location[index] && (
                  <div style={checkedIndicatorStyle(true)} />
                )}
              </div>
              {label}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-3 mt-6">
        <h2 className="font-medium text-zinc-500 mb-2">Industry</h2>
        <div className="flex flex-col gap-2">
          {labels3.map((label, index) => (
            <label key={index} className="flex items-center gap-2">
              <div
                onClick={() => handleCheckboxClick(index, 'industry')}
                style={checkboxStyle(industry[index])}
              >
                {industry[index] && (
                  <div style={checkedIndicatorStyle(true)} />
                )}
              </div>
              {label}
            </label>
          ))}
        </div>
      </div>
      <div className="filter-4 mt-6">
        <h2 className="font-medium text-zinc-500 mb-2">Department</h2>
        <div className="flex flex-col gap-2">
          {labels4.map((label, index) => (
            <label key={index} className="flex items-center gap-2">
              <div
                onClick={() => handleCheckboxClick(index, 'department')}
                style={checkboxStyle(department[index])}
              >
                {department[index] && (
                  <div style={checkedIndicatorStyle(true)} />
                )}
              </div>
              {label}
            </label>
          ))}
        </div>
      </div>
      <div className="filter-5 mt-6">
        <h2 className="font-medium text-zinc-500 mb-2">Experience</h2>
        <div className="flex flex-col gap-2">
          {labels5.map((label, index) => (
            <label key={index} className="flex items-center gap-2">
              <div
                onClick={() => handleCheckboxClick(index, 'experience')}
                style={checkboxStyle(experience[index])}
              >
                {experience[index] && (
                  <div style={checkedIndicatorStyle(true)} />
                )}
              </div>
              {label}
            </label>
          ))}
        </div>
      </div>
      <div className="filter-6 mt-6">
        <h2 className="font-medium text-zinc-500 mb-2">Nature Of business</h2>
        <div className="flex flex-col gap-2">
          {labels6.map((label, index) => (
            <label key={index} className="flex items-center gap-2">
              <div
                onClick={() => handleCheckboxClick(index, 'natureofbusiness')}
                style={checkboxStyle(natureOfBusiness[index])}
              >
                {natureOfBusiness[index] && (
                  <div style={checkedIndicatorStyle(true)} />
                )}
              </div>
              {label}
            </label>
          ))}
        </div>
      </div>
      <div className="filter-7 mt-6">
        <h2 className="font-medium text-zinc-500 mb-2">Job posting date</h2>
        <div className="flex flex-col gap-2">
          {labels7.map((label, index) => (
            <label key={index} className="flex items-center gap-2">
              <div
                onClick={() => handleCheckboxClick(index, 'jobpostingdate')}
                style={checkboxStyle(jobpostingdate[index])}
              >
                {jobpostingdate[index] && (
                  <div style={checkedIndicatorStyle(true)} />
                )}
              </div>
              {label}
            </label>
          ))}
        </div>
      </div>

      <div className="button mt-7">
        <button onClick={applyCompFilters} className='px-7 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600'>Apply</button>
      </div>
    </div>
  );
}

export default SideBar;
