const app=require('./app');
const connectDB=require("./src/config/db.js")
require('dotenv').config();
const PORT=process.env.PORT || 3501
// connect mongoDb
connectDB()
     app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });