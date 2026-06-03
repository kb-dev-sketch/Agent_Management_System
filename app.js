import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


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
export default app;

