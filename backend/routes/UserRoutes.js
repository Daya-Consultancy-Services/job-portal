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
    applyJobs
    
} = require("../controllers/Usercontrol")

const { auth , isJobseeker} = require("../middleware/auth");


// for the User controller

router.post("/signup",signup);

router.post("/login",login)

router.put("/update",auth,isJobseeker,updateDetail)

router.delete("/delete",auth,isJobseeker, deleteUser)

router.get("/getdetail",auth,isJobseeker,getalldetail)
router.get("/getjobs",getJobs)

router.post("/applyjob",auth,isJobseeker,applyJobs)



module.exports = router


// {
//     "firstName":"Jane",
//     "lastName":"Doe",
//     "email":"jane45@gmail.com",
//     "password":"12345",
//     "role":"jobseeker"
// }