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
    deleteOnlineProfile
    
} = require("../controllers/OnlineProfileControl")

const {

    createCertificate,
    updateCertificate,
    deleteCertificate
    
} = require("../controllers/CertificateControl")

const {

    createSkillProfile,
    updateSkillProfile,
    deleteSkillProfile

} = require("../controllers/SkillsControl")
 
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

router.put("/deleteonlineprofile",auth,deleteOnlineProfile)

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

//SkillProfile Routes*******************************************************************************************************
router.post("/skillprofile",auth,isJobseeker,createSkillProfile)
// {
//     "skillName":"React",
//     "experience":"1year"
// }
router.put("/updateskillprofile",auth,isJobseeker,updateSkillProfile)
router.delete("/deleteskillprofile",auth,isJobseeker,deleteSkillProfile)



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