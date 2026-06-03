const app=require('./app');
const mongoose=require('mongoose');
require('dotenv').config();

const PORT=process.env.PORT || 3501;

mongoose.connect(process.env.MONGO_URI
   
).then(()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error)=>{
    console.error('Failed to connect to MongoDB:',error.message);
    process.exit(1);
});