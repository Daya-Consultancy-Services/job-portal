import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoLocationOutline } from "react-icons/io5";
import { PiBriefcase } from "react-icons/pi";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";

function HeadBar() {
  const [dropdowns, setDropdowns] = useState({
    employers: false,
    workLocation: false,
    industries: false,
    jobRoles: false,
  });

  // Toggle the dropdown visibility for the specified key
  const toggleDropdown = (key) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const dropdownItems = {
    employers: [
      { href: '#buy-online', label: 'Buy Online' },
      { href: '#onecareer-hiring-suite', label: 'Onecareer Hiring Suite' },
      { href: '#employer-login', label: 'Employer Login' },
    ],
    workLocation: [
      { href: '#remote', label: 'Remote' },
      { href: '#on-site', label: 'On-site' },
      { href: '#hybrid', label: 'Hybrid' },
    ],
    industries: [
      { href: '#it', label: 'IT' },
      { href: '#healthcare', label: 'Healthcare' },
      { href: '#finance', label: 'Finance' },
    ],
    jobRoles: [
      { href: '#developer', label: 'Developer' },
      { href: '#designer', label: 'Designer' },
      { href: '#manager', label: 'Manager' },
    ],
  };

  const renderDropdown = (key, label) => (
    <div className="relative role-dropdown w-[20%]">
      <div className="absolute inline-block text-left w-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        {/* Dropdown Trigger */}
        <button
          onClick={() => toggleDropdown(key)}
          className="inline-flex justify-between w-[200px] px-4 py-2 text-sm font-medium text-gray-700 rounded-lg focus:outline-none"
        >
          {label}
          <svg
            className={`w-5 h-5 ml-2 transition-transform duration-300 ${
              dropdowns[key] ? 'rotate-180' : 'rotate-0'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {dropdowns[key] && (
          <div className="absolute  z-10 w-48 mt-2 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg">
            <ul className="py-1">
              {dropdownItems[key].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bottom-0 absolute h-[80px] w-full flex items-center justify-end  gap-10">
      <div className="h-[80px] w-[18.42%]  flex items-center justify-start pl-[60px]   border-r-[0.1px]  border-gray-500">
        <FaSearch style={{color:"gray"}}/>
        {renderDropdown('employers', 'For Employers')}
      </div>
      <div className="h-[80px] w-[18.42%]  flex items-center justify-start pl-[60px]   border-r-[0.1px]  border-gray-500">
      <IoLocationOutline style={{color:"gray"}} />
        {renderDropdown('workLocation', 'Work Location')}
      </div>
      <div className="h-[80px] w-[18.42%]  flex items-center justify-start pl-[60px]   border-r-[0.1px]  border-gray-500">
      <PiBriefcase style={{color:"gray"}} />
        {renderDropdown('industries', 'Industries')}
      </div>
      <div className="h-[80px] w-[18.42%]  flex items-center justify-start pl-[60px]   border-r-[0.1px]  border-gray-500">
      <RiMoneyRupeeCircleLine style={{color:"gray"}} />
        {renderDropdown('jobRoles', 'Job Roles')}
      </div>
    </div>
  );
}

export default HeadBar;
