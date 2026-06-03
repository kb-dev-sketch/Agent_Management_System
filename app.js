const express =require('express');
const cors=require('cors');
const dotenv=require('dotenv');


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
module.exports = app;

