const express=require("express");
const router=express.Router();
const {
    registerAdmin,
    loginAdmin,
    logoutAdmin
}=require("../controllers/admin_controller")
const {createAgent,getAgent}=require("../controllers/agent_controller")
console.log(registerAdmin);
console.log(loginAdmin);
console.log(logoutAdmin);
router.post("/register",registerAdmin);
router.post("/login",loginAdmin);
router.post("/logout",logoutAdmin);
router.post("/createAgent",createAgent)
router.get("/getAgent",getAgent)

module.exports=router;