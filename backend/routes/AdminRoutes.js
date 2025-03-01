const express = require("express");
const router =  express.Router();

const {

    createAdmin,
    loginAdmin,
    updateAdmin,
    deleteAdmin,
    changeAdminPassword,
    grantUserDetailAccess,
    logoutAdmin

} = require("../controllers/AdminControler")
const {
    resetPasswordToken,
    resetPassword,
} = require("../controllers/resetPasswordControler")

const {auth,isAdmin} = require("../middleware/auth");


router.post("/signup",createAdmin);
router.post("/login",loginAdmin);
router.put("/update",isAdmin,updateAdmin)
router.delete("/delete",isAdmin,deleteAdmin)
router.post("/changepassword",auth,isAdmin,changeAdminPassword)
router.post("/reset-password-token", resetPasswordToken)
router.post("/reset-password", resetPassword)
router.post("/grantAccess",auth,isAdmin,grantUserDetailAccess);
router.get("/logout",logoutAdmin)

module.exports = router 