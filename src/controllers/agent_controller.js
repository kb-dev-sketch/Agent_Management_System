const bcrypt=require("bcrypt");
const Agent = require("../models/agent-model");
const createAgent=async(req,res)=>{
    try{
    const {email,firstName,password,phoneNumber}=req.body
if(!email || !password|| !firstName || !phoneNumber ){
    return res.status(403).json({
        message:"all fields required "
    })
}

const existedAgent=await Agent.findOne({
    email:email,
    phoneNumber:phoneNumber,
})
if(existedAgent){
    return res.status(401).json({
        message:"Agent is already created"
    })
}
// create  object 
// hash password
    const hashedPassword=await bcrypt.hash(password,10);

  const newAgent= await Agent.create({
    email,
    password,
    firstName,
    phoneNumber,
    password:hashedPassword
 } )
 return res.status(201).json({
    message:"agent is created successfully & save to database ",
   newAgent


 })
}
catch(error){
    res.status(500).json({
        message:error.message,
    });
}
};

const getAgent=async(req,res)=>{
    try{
        const agents=await Agent.find();
        res.status(200).json({
            success:true,
            agents,
        });
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}


module.exports={createAgent,getAgent}