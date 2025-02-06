const express = require("express");
const router = express.Router();



const {
    companySignup,
    loginCompany,
    updateCompanyDetail,
    deleteCompany,
    getAllDetailCompany,
    createRecruiter,
    updateRecruiterDetail,
    getAlldetail,
    logoutCompany

} = require("../controllers/Companycontrol") 


const { auth , isCompany,isRecruiter} = require("../middleware/auth");


//For the Company controller

router.post("/signup",companySignup);

// {
//     "name":"Dcs",
//     "description":"Services company",
//     "email":"dcs@gmail.com",
//     "password":"12345",
//     "role":"company",
//     "website":"dsc.com",
//     "location":"orrisa",
//     "logo":"logoString",
//     "companyfield":"IT"
// }

router.post("/login",loginCompany);

router.put("/update",auth,isCompany,updateCompanyDetail);
// {
//     "name":"Tcs",
//     "description":"New service  company",
//     "email":"tataServices@gmail.com",  
//     "website":"tsc.com",
//     "location":"Delhi",
//     "logo":"newlogoString",
//     "companyfield":"Training It"
// }

router.delete("/delete",auth,isCompany,deleteCompany); // delete the company profile 


router.get("/companydetails",auth,getAllDetailCompany);  // get all the detail for the company with the recruiter details
router.get("/logoutcompany",logoutCompany);  // get all the detail for the company with the recruiter details

// recruiter **********************************************************************************************
router.post("/createrecruiter",auth,createRecruiter);
router.put("/updaterecruiter",auth,isRecruiter,updateRecruiterDetail)
router.get("/getrecruiter",auth,isRecruiter,getAlldetail)

module.exports = router