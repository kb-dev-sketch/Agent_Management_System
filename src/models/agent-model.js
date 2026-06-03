const mongoose =require("mongoose")
const agentSchema=new mongoose.Schema({
firstName:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
    unique:true,
},
password:{
    type:String,
    required:true,
},
phoneNumber:{
    type:String,
    required:true,
    unique:true,
}

    })
    module.exports=mongoose.model("Agent",agentSchema)