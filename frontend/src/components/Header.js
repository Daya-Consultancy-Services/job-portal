import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAdminExists } from '../operations/adminapi';
// Update with correct path

function Header() {
  const dispatch = useDispatch();
  const { adminExists } = useSelector(state => state.admin);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownValue, setIsDropdownValue] = useState(() => {
    // Initialize from localStorage, default to "User" if not set
    return localStorage.getItem('userType') || "User";
  });
  const [hovered, setHovered] = useState(null);

  // Check if admin exists when component mounts or dropdown value changes to Admin
  useEffect(() => {
    if (isDropdownValue === "Admin") {
      dispatch(checkAdminExists());
    }
  }, [dispatch, isDropdownValue]);

  // Update localStorage when dropdown value changes
  useEffect(() => {
    localStorage.setItem('userType', isDropdownValue);
  }, [isDropdownValue]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (value) => {
    setIsDropdownValue(value);
    setIsDropdownOpen(false);
  };

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const loginPath = (() => {
    switch(isDropdownValue) {
      case "User":
        return "/components/auth/User/login";
      case "Company":
        return "/components/auth/Company/login";
      case "Recruiter":
        return "/components/auth/Recruiter/login";
      case "Admin":
        return "/components/auth/Admin/AdminLogin";
      default:
        return "/components/auth/User/login";
    }
  })();

  const registerPath = (() => {
    switch(isDropdownValue) {
      case "User":
        return "/components/auth/User/register";
      case "Company":
        return "/components/auth/Company/register";
      case "Admin":
        return "/components/auth/Admin/AdminRegister";
      default:
        return "/components/auth/User/register";
    }
  })();

  const showSignupButton = () => {
    if (isDropdownValue === "Recruiter") {
      return false; 
    } else if (isDropdownValue === "Admin" && adminExists) {
      return false;
    }
    return true; 
  };

  const linkStyle = (index) => ({
    position: 'relative',
    fontWeight: '600',
    display: 'inline-block',
    paddingBottom: '5px',
  });

  const lineStyle = (index) => ({
    position: 'absolute',
    left: '0',
    bottom: '0',
    width: hovered === index ? '100%' : '0',
    height: '2px',
    backgroundColor: '#e7c1e1',
    transition: 'width 0.3s ease',
  });

  return (
    <>
      <div className="h-[60px] w-full flex items-center justify-center p-2 fixed z-[9999] pt-8">
        <div
          className="h-[60px] w-[99%] flex items-center pl-2 pr-2 justify-between fixed rounded-xl"
          style={{
            background: 'white',
            boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
            backdropFilter: 'blur( 8.5px )',
          }}
        >
          <Link to="/">
            <div className="logo h-[50px] w-[150px] flex justify-start items-center">
              <img
                src={require('../assets/logo.png')}
                className="h-[85px] w-[85px] relative top-[3px]"
                alt="Logo"
              />
            </div>
          </Link>

          {/* <div className="navabar w-[40%] h-[40px]">
            <nav className="h-full w-full">
              <ul className="flex gap-[10%] items-center justify-center h-full w-full">
                <li
                  onMouseEnter={() => handleMouseEnter(1)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link to="/jobs" style={linkStyle(1)}>
                    Jobs
                    <span style={lineStyle(1)}></span>
                  </Link>
                </li>
                <li
                  onMouseEnter={() => handleMouseEnter(2)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link to="/company" style={linkStyle(2)}>
                    Company
                    <span style={lineStyle(2)}></span>
                  </Link>
                </li>
                <li
                  onMouseEnter={() => handleMouseEnter(3)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link to="/services" style={linkStyle(3)}>
                    Services
                    <span style={lineStyle(3)}></span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div> */}
          <div className="buttons w-[500px] h-[40px] flex justify-center gap-[5%] pl-2 pr-2">
            <Link 
              to={loginPath} 
              className={showSignupButton() ? "w-[40%]" : "w-[80%]"}
            >
              <button className="pl-2 pr-2 bg-white w-full h-full rounded-full border font-semibold text-black transition-all duration-200 ease-in-out hover:bg-zinc-200">
                Login
              </button>
            </Link>

            {showSignupButton() && (
              <Link to={registerPath} className="w-[40%]">
                <button className="pl-2 pr-2 bg-pink-300 w-full h-full rounded-full font-semibold text-white border transition-all duration-200 ease-in-out hover:text-white hover:bg-pink-400">
                  Sign Up
                </button>
              </Link>
            )}

            <div className="dropdown">
              <div className="relative inline-block text-left">
                <button
                  onClick={toggleDropdown}
                  className="inline-flex justify-between w-48 px-4 py-2 text-sm font-medium text-gray-700 border rounded-full shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  {isDropdownValue}
                  <svg
                    className={`w-5 h-5 ml-2 transition-transform duration-300 ${
                      isDropdownOpen ? 'rotate-180' : 'rotate-0'
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

                {isDropdownOpen && (
                  <div className="absolute right-0 z-10 w-48 mt-2 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg">
                    <ul className="py-1">
                      <li>
                        <button
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          onClick={() => handleOptionSelect("User")}
                        >
                          User
                        </button>
                      </li>
                      <li>
                        <button
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          onClick={() => handleOptionSelect("Company")}
                        >
                          Company
                        </button>
                      </li>
                      <li>
                        <button
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          onClick={() => handleOptionSelect("Recruiter")}
                        >
                          Recruiter
                        </button>
                      </li>
                      <li>
                        <button
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          onClick={() => handleOptionSelect("Admin")}
                        >
                          Admin
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;