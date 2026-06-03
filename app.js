const express =require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const authRoutes=require("./src/routes/authRoutes")

dotenv.config();

const app = express();



// Middleware
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
  res.json({
    message:"Welcome to the backend of the application"
  })
})
app.use("/api/auth",authRoutes);
module.exports = app;

