const express=require("express");
const router=express.Router();
const {verifyToken}=require("../middleware/authMiddleware")
const upload=require("../middleware/upload_middleware");

const {uploadFile}=require("../controllers/uploadController");
console.log("verifyToken:", typeof verifyToken);
console.log("uploadFile:", typeof uploadFile);
console.log("upload:", typeof upload);
router.post("/",
    verifyToken,
    upload.single("file"),
    uploadFile
);
module.exports=router;
