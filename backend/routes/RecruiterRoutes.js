const express = require("express");
const router = express.Router();


const {

    updateRecruiterDetail,
    getAlldetail
    
} = require("../controllers/RecruiterControl")

const { auth , isCompany} = require("../middleware/auth");


router.put("/update",auth,isCompany,updateRecruiterDetail);

// {
//     "name":"Jacks",
//     "email":"jack66@gmail.com",
//     "password":"12345",
//     "contactNumber":"89009876566",
//     "image":"image url",
//     "description":"im recruiter"
// }

router.get("/getdetail",auth,isCompany,getAlldetail)



module.exports = router