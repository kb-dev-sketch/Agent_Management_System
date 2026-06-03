const mongoose =require("mongoose")

const taskSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    notes:{
        type:String,
        required:true
    },
    assignedAgent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Agent"
    }

});
export default mongoose.model("Task", taskSchema);