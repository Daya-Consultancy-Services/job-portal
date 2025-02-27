const express = require("express");
const router =  express.Router();

const {

    createAdmin,
    loginAdmin,
    updateAdmin,
    deleteAdmin,
    grantUserDetailAccess,
    logoutAdmin

} = require("../controllers/AdminControler")

const {auth,isAdmin} = require("../middleware/auth");


router.post("/signup",createAdmin);
router.post("/login",loginAdmin);
router.put("/update",isAdmin,updateAdmin)
router.delete("/delete",isAdmin,deleteAdmin)
router.post("/grantAccess",auth,isAdmin,grantUserDetailAccess);
router.get("/logout",logoutAdmin)

module.exports = router 