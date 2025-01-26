const express = require("express");
const router = express.Router();


const {

    updateProfile,
    getAllDetail,

} = require("../controllers/Profilecontrol")

const {

    createPersonalDetail,
    updatePersonalDetail,
    deletePeronalDetail

} = require("../controllers/PersonalDetailcontrol") 

const {

    createOnlineProfile,
    updateOnlineProfile,
    deleteOnlineProfile,
    getOnlineProfile
    
} = require("../controllers/OnlineProfileControl")

const {

    createCertificate,
    updateCertificate,
    deleteCertificate,
    getCertificates
    
} = require("../controllers/CertificateControl")

const {

    createSkillProfile,
    updateSkillProfile,
    deleteSkillProfile,
    getSkillProfile

} = require("../controllers/SkillsControl")
    

const {

    createProject,
    updateProject,
    deleteProject,
    getProject

} = require("../controllers/ProjectControl")

const {

    createCareer,
    updateCareer,
    deleteCareer,
    getCareer

} = require("../controllers/CareerControler")
const {

    createEducationProfile,
    updateEducationProfile,
    deleteEducationProfile,
    getEducationProfile

} = require("../controllers/EducationControl")

const {

    createEmploymentProfile,
    updateEmploymentProfile,
    deleteEmploymentProfile

} = require("../controllers/EmploymentControl")

const { auth , isJobseeker} = require("../middleware/auth");

router.put("/update",auth,isJobseeker,updateProfile)
// {
//     "about":"developer",
//     "contactNumber":"070787870",
//     "resume":"link",
//     "resumeHeadline":"resume good",
//     "profileSummary":"about",
//     "location":"mumbai",
//     "image":"link"
// }

router.get("/details",auth,getAllDetail)


// Personal Details routes***********************************************************************************************
router.post("/personaldetail",auth,createPersonalDetail)

router.put("/updatepersonaldetail",auth,updatePersonalDetail)

router.put("/deletepersonaldetail",auth,deletePeronalDetail)

// {
//     "gender":"male",
//     "dateOfBirth":"12/09/9999",
//     "martialStatus":"Single",
//     "permanentAddress":"mumbai",
//     "pincode":"400607",
//     "language":"english",
//     "address":"orrisa"
// }

//Online Profile routes***************************************************************************************************
router.post("/onlineprofile",auth,isJobseeker,createOnlineProfile)

// {
//     "instagramLink":"www.instagram.com",
//     "facebookLink":"www.facebock.com",
//     "githubLink":"www.github.com",
//     "linkedinLink":"www.linkedIN.com"
// }

router.put("/updateonlineprofile",auth,isJobseeker,updateOnlineProfile)

router.put("/deleteonlineprofile",auth, isJobseeker,deleteOnlineProfile)
router.get("/getonlineprofile",auth,isJobseeker,getOnlineProfile)

        // the body will have the 
        // {
        //     "instagramLink": true,
        //     "facebookLink": true
        // }
//Certificate Routes ******************************************************************************************************
router.post("/certificate",auth,isJobseeker,createCertificate)
// {
//     "certificateName":"full Stack",
//     "certificateLink":"link",
//     "certificateDescription":"MERNStack"
// }
router.put("/updatecertificate",auth,isJobseeker,updateCertificate)

router.delete("/deletecertificate",auth,isJobseeker,deleteCertificate)
router.get("/getcertificate",auth,isJobseeker,getCertificates);

//SkillProfile Routes*******************************************************************************************************
router.post("/skillprofile",auth,isJobseeker,createSkillProfile)
// {
//     "skillName":"React",
//     "experience":"1year"
// }
router.put("/updateskillprofile",auth,isJobseeker,updateSkillProfile)
router.delete("/deleteskillprofile",auth,isJobseeker,deleteSkillProfile)
router.get("/getskillprofile",auth,isJobseeker,getSkillProfile)

//ProjectProfile Routes*****************************************************************************************************
router.post("/project",auth,isJobseeker,createProject)
// {
//     "projectTitle":"todo app",
//     "projectLink":"todo.com",
//     "projectDescription":"Simple Js app with crud operation",
//     "projectSkills":["js","mysql"]
// }
router.put("/updateproject",auth,isJobseeker,updateProject)
router.delete("/deleteproject",auth,isJobseeker,deleteProject)
router.get("/getproject",auth,isJobseeker,getProject)

//CareerProfile**************************************************************************************************************
router.post("/careerprofile",auth,isJobseeker,createCareer)
// {
//             "industryType":"IT",
//             "department":"Software Engineer",
//             "empType":"Fulltime",
//             "skills":["java","springboot"],
//             "jobLocation":"Mumbai",
//             "salary":"40k"
// }
router.put("/updatecareer",auth,isJobseeker,updateCareer)
router.delete("/deletecareer",auth,isJobseeker,deleteCareer)
router.get("/getcareer",auth,isJobseeker,getCareer)

//educationProfile***********************************************************************************************************
router.post("/educationprofile",auth,isJobseeker,createEducationProfile)
// {
//     "educationName":"MCA",
//     "institutionName":"PICA",
//     "courseName":"Master in Computer Application",
//     "courseType":"In-person",
//     "duration":"2year",
//     "marks":"8.75",
//     "location":"Gujarat",
//     "education":"Post-graduation"
// }
router.put("/updateeducation",auth,isJobseeker,updateEducationProfile)
router.delete("/deleteeducation",auth,isJobseeker,deleteEducationProfile)
router.get("/geteducation",auth,isJobseeker,getEducationProfile)
//employmentprofile************************************************************************************************************
router.post("/employprofile",auth,isJobseeker,createEmploymentProfile)
// {
//     "isCurrentEmp":"true",
//     "empType":"Fulltime",
//     "totalExp":"1year",
//     "currentJobTitle:"Mern stack",
//     "joinDate":"12jan",
//     "leaveDate":"13jan",
//     "currentSalary":"40k",
//     "skill":["javascript","Mongo"],
//     "jobProfile":"IT",
//     "noticePeriod":"30days",
//     "jobDescription":"Web developer"
// }
router.put("/updateemployprofile",auth,isJobseeker,updateEmploymentProfile)
router.delete("/deleteemployprofile",auth,isJobseeker,deleteEmploymentProfile)


module.exports=router


// {
//     "gender":"Male",
//     "dateOfBirth":"20/06/1999",
//     "about":"im a fullstack dev",
//     "address":"Maharastra",
//     "contactNumber":"852963147",
//     "education":"Post-graduation",
//     "empType":"Fulltime",
//     "skills":["js"],
//     "resume":"link",
//     "resumeHeadline":"resumeHeadline",
//     "profileSummary":"im developer",
//     "location":"thane",
//     "image":"link"
// }

// {
//     "email":"jane45@gmail.com",
//     "password":"12345"
// }