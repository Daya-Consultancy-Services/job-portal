const express = require("express");
const router = express.Router();




// Importing the user controller function with auth middleware for verification
const {
    signup,
    login,
    updateDetail,
    deleteUser,
    getalldetail,
    getJobs,
    applyJobs,
    getAppliedJobs,
    changePassword,
    searchJobs,
    getJobDetails,
    
} = require("../controllers/Usercontrol")

const {
    resetPasswordToken,
    resetPassword,
} = require("../controllers/resetPasswordControler")

const { auth , isJobseeker} = require("../middleware/auth");


// for the User controller

router.post("/signup",signup);

router.post("/login",login)

router.put("/update",auth,isJobseeker,updateDetail)
router.post("/changepassword",auth,isJobseeker,changePassword)

router.post("/reset-password-token", resetPasswordToken)
router.post("/reset-password", resetPassword)

router.delete("/delete",auth,isJobseeker, deleteUser)

router.get("/getdetail",auth,isJobseeker,getalldetail)
router.get("/getjobs",getJobs)

router.post("/applyjob",auth,isJobseeker,applyJobs)
router.get("/getappliedjob",auth,isJobseeker,getAppliedJobs)
router.get('/search', auth,isJobseeker, searchJobs);
router.get("/job/:jobId", auth, isJobseeker, getJobDetails);



module.exports = router


// {
//     "firstName":"Jane",
//     "lastName":"Doe",
//     "email":"jane45@gmail.com",
//     "password":"12345",
//     "role":"jobseeker"
// }