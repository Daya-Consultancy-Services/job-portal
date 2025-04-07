import React, { useState } from 'react';
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { ImLinkedin } from "react-icons/im";
import { BsTwitterX } from "react-icons/bs";
import { Link } from 'react-router-dom';

function Footer() {
  const [hoveredTechnology, setHoveredTechnology] = useState(null);
  const [hoveredEmployers, setHoveredEmployers] = useState(null);
  const [hoveredCompany, setHoveredCompany] = useState(null);

  const links1 = [
    { text: 'Search for Jobs', path: '/search-jobs' },
    { text: 'Browse Jobs', path: '/browse-jobs' },
    { text: 'Browse Companies', path: '/browse-companies' },
    { text: 'Career Advice', path: '/career-advice' },
  ];

  const links2 = [
    { text: 'Post Jobs', path: '/post-jobs' },
    { text: 'Source Talent', path: '/source-talent' },
    { text: 'Employer & Advertising', path: '/employer-advertising' },
    { text: 'Hiring Events', path: '/hiring-events' },
  ];

  const links3 = [
    { text: 'About Us', path: '/about' },
    { text: 'Media', path: '/media' },
    { text: 'Work at OneCareer', path: '/work-at-one-career' },
    { text: 'Contact Us', path: '/contact-us' },
  ];

  const renderLinks = (links, hoveredIndex, setHoveredIndex) => (
    <ul className="space-y-4 mt-6">
      {links.map((link, index) => (
        <li
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative group"
        >
          <Link to={link.path} className="text-slate-500 relative pb-2">
            {link.text}
            <span
              className={`absolute left-0 bottom-0 h-[2px] bg-pink-400 transition-all duration-300 ${
                hoveredIndex === index ? 'w-full' : 'w-0'
              }`}
            />
          </Link>
        </li>
      ))}
    </ul>
  );

  return (

    <div className="h-[30vh] p-3 flex justify-between bg-white relative z-50">
      {/* Left Section */}
      <div className="onecareer w-[20%] h-[70%] flex flex-col p-5">
        <div className="icon flex items-center">
          <img src={require('../assets/logo.png')} className="h-[65px] w-[65px]" alt="Logo" />
          <h1 className="text-3xl font-semibold ml-2">One Career</h1>
        </div>
        <p className="mt-7 text-slate-500 ">
        One Career connects you with career opportunities tailored to your skills, relevance, and preferences.
        </p>
        <div className="icons flex mt-4 space-x-3">
          <FaFacebook size={30} />
          <RiInstagramFill size={30} />
          <ImLinkedin size={30} />
          <BsTwitterX size={30} />
        </div>
      </div>

      {/* Right Section */}
      <div className="left-footer w-[60%] flex justify-between">
        {/* Technology Section */}
        <div className="technology w-[30%] p-8">
          <h1 className="text-3xl font-semibold mb-4">Technology</h1>
          {renderLinks(links1, hoveredTechnology, setHoveredTechnology)}
        </div>

        {/* Employers Section */}
        <div className="employers w-[30%] p-8">
          <h1 className="text-3xl font-semibold mb-4">Employers</h1>
          {renderLinks(links2, hoveredEmployers, setHoveredEmployers)}
        </div>

        {/* Company Section */}
        <div className="company w-[30%] p-8">
          <h1 className="text-3xl font-semibold mb-4">Company</h1>
          {renderLinks(links3, hoveredCompany, setHoveredCompany)}
        </div>
      </div>
    </div>
  );
}

export default Footer;
