const express = require("express");
const router =  express.Router();

const {

    createAdmin,
    loginAdmin,
    updateAdmin,
    deleteAdmin,
    grantUserDetailAccess,
    logoutAdmin,
    uploadAdminImage,
    getAlldetailAdmin

} = require("../controllers/AdminControler")

const {auth,isAdmin} = require("../middleware/auth");


router.post("/signup",createAdmin);
router.post("/login",loginAdmin);
router.post("/upload-AdminImage",auth,isAdmin, uploadAdminImage);
router.put("/update",isAdmin,updateAdmin)
router.delete("/delete",isAdmin,deleteAdmin);
router.get("/getadmin", auth, isAdmin, getAlldetailAdmin)
router.post("/grantAccess",auth,isAdmin,grantUserDetailAccess);
router.get("/logout",logoutAdmin)

module.exports = router 