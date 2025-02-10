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
import CompanyProfile from "./components/profiles/CompanyProfiles/CompanyProfile";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/components/auth/User/register" element={<Register/>}/>
        <Route path="/components/auth/User/login" element={<Login/>}/>
        <Route path="/components/auth/Company/login" element={<CompanyLogin/>}/>
        <Route path="/components/auth/Company/register" element={<CompanySignUp/>}/>
        <Route path="/components/profiles/UserProfile" element={<Profile/>}/>
        <Route path="/components/profiles/CompanyProfiles/CompanyProfile" element={<CompanyProfile/>}/>

        <Route path="/home" element={<Home/>}/>
        <Route path="/jobs" element={<FindaJob/>}/>
        <Route path="/company" element={<Company/>}/>
        <Route path="/services" element={<Blog/>}/>
      </Routes>
     
    </Router>
  );
}

export default App;
