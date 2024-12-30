const express = require("express");
const router = express.Router();


const {
    updateProfile,
    getAllDetail,

} = require("../controllers/Profilecontrol")

const { auth , isJobseeker} = require("../middleware/auth");

router.put("/update",auth,isJobseeker,updateProfile)

router.get("/details",auth,getAllDetail)



module.exports=router

// {
//     "gender":"Male",
//     "dateOfBirth":"20/06/1999",
//     "about":"im a fullstack dev",
//     "address":"Maharastra",
//     "contactNumber":"852963147",
//     "education":"Post-graduation",
//     "workstatus":"Experience",
//     "empType":"Fulltime",
//     "skills":"js react html",
//     "coverletter": "Looking for fullstack job"
// }

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