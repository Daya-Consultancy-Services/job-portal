import Blog from "./pages/Services";
import Company from "./pages/Companies/Company";
import FindaJob from "./pages/Jobs/Jobs";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/home/Home";
import Landing from "./pages/landingpage/Landing";
import Register from "./components/auth/User/Register";
import Login from "./components/auth/User/Login";
import CompanyLogin from "./components/auth/Company/CompanyLogin";
import CompanySignUp from "./components/auth/Company/CompanySignUp";
import Profile from "./components/profiles/UserProfile";
import CompanyRecruiterLogin from "./components/auth/Recruiter/CompanyRecruiterLogin";
import Dashboard from "./components/profiles/RecruiterDashboard/Dashboard";
import AppliedJobs from "./components/profiles/AppliedJobs";
import Admin from "./components/auth/Admin/Admin";
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from "react-hot-toast";
import AdminLogin from "./components/auth/Admin/AdminLogin";
import AdminRegister from "./components/auth/Admin/AdminRegister";
import ResetPassword from "./components/ResetPassword";
// import CompanyProfile from "./pages/Admin/AdminCompanyProfile";
import AdminCompanyProfile from "./pages/Admin/AdminCompanyProfile";
import CompanyProfile from "./components/profiles/CompanyProfiles/CompanyProfile";
import SearchResults from "./components/SearchResults";



function App() {
  return (
    <Router>
           <Toaster position="bottom-right"  />
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/components/auth/User/register" element={<Register/>}/>
        <Route path="/components/auth/User/login" element={<Login/>}/>
        <Route path="/update-password/:token" element={<ResetPassword/>}/>
        <Route path="/components/auth/Company/login" element={<CompanyLogin/>}/>
        <Route path = "/company-profile/:companyId" element={<AdminCompanyProfile/>}/>
        <Route path="/components/auth/Company/register" element={<CompanySignUp/>}/>
        <Route path="/components/auth/Recruiter/login" element={<CompanyRecruiterLogin/>}/>
        <Route path="/components/auth/Admin/AdminRegister" element={<AdminRegister/>}/>
        <Route path="/components/auth/Admin/AdminLogin" element={<AdminLogin/>}/>
        <Route path="/components/profiles/RecruiterDashboard/Dashboard" element={<Dashboard/>}/>
        <Route path="/components/profiles/UserProfile" element={<Profile/>}/>
        <Route path="/components/profiles/AppliedJobs" element={<AppliedJobs/>}/>
        <Route path="/components/profiles/CompanyProfiles/CompanyProfile" element={<CompanyProfile/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/jobs" element={<FindaJob/>}/>
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/company" element={<Company/>}/>
        <Route path="/services" element={<Blog/>}/>
        <Route path="/admin" element={<Admin/>}/>
       
      </Routes>

     
    </Router>

  );
}

export default App;
