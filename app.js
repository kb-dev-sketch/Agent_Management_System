const express =require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const authRoutes=require("./src/routes/authRoutes")
const uploadRoutes=require("./src/routes/uploadRoutes")
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

app.use("/api/upload",
  uploadRoutes
)
const taskRoutes =
require("./src/routes/taskRoutes");

app.use("/api/tasks", taskRoutes);
module.exports = app;

