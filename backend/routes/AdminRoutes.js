const express = require("express");
const router =  express.Router();

const {

    createAdmin,
    loginAdmin,
    updateAdmin,
    deleteAdmin,
    changeAdminPassword,
    logoutAdmin,
    uploadAdminImage,
    getAlldetailAdmin,
    assignTokensToCompany,
    getAllCompaniesForAdmin

} = require("../controllers/AdminControler")
const {
    resetPasswordToken,
    resetPassword,
} = require("../controllers/resetPasswordControler")

const {auth,isAdmin} = require("../middleware/auth");


router.post("/signup",createAdmin);
router.post("/login",loginAdmin);
router.post("/upload-AdminImage",auth,isAdmin, uploadAdminImage);
router.put("/update",isAdmin,updateAdmin)
router.post("/changepassword",auth,isAdmin,changeAdminPassword)
router.post("/reset-password-token", resetPasswordToken)
router.post("/reset-password", resetPassword)
router.delete("/delete",isAdmin,deleteAdmin);
router.get("/getadmin", auth, isAdmin, getAlldetailAdmin),
router.get("/getallCompany",auth,isAdmin,getAllCompaniesForAdmin),
router.post("/tokenCompany",auth,isAdmin,assignTokensToCompany),
router.get("/logout",logoutAdmin)

module.exports = router 