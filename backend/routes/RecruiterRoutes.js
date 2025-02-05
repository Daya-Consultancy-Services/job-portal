const express = require("express");
const router = express.Router();


const {

    loginRecruiter,
    createJob,
    updateJob,
    deleteJob,
    getJobRecruiter,
    logoutRecruiter
    
} = require("../controllers/RecruiterControl")

const { auth , isRecruiter} = require("../middleware/auth");


router.post("/loginrecruiter",loginRecruiter)
router.get("/logout",logoutRecruiter)

router.post("/createjob",auth,isRecruiter,createJob)
// {
//     "jobTitle":"web dev intern",
//     "description":"des",
//     "skillRequired":["js"],
//     "jobType":"WFO",
//     "salaryRange":"5k",
//     "jobLocation":"mumbai"
// } 
router.put("/updatejob",auth,isRecruiter,updateJob)
router.delete("/deletejob",auth,isRecruiter,deleteJob)

router.get("/getjobrecruiter",auth,isRecruiter,getJobRecruiter)
// {
//     "name":"Jacks",
//     "email":"jack66@gmail.com",
//     "password":"12345",
//     "contactNumber":"89009876566",
//     "image":"image url",
//     "description":"im recruiter"
// }





module.exports = router