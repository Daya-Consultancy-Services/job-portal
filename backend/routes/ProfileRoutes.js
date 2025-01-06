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


// Personal Details routes
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