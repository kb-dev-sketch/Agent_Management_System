const Task =require("../models/task-model")

const Agent=require("../models/agent-model")

const XLSX=require("xlsx")
const uploadFile=async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({
                message:"No file uploaded",
            });
        }
        // read CSV/XLSX
        const workbook=XLSX.read(
            req.file.buffer,
            {
                type:"buffer"
            }
        );
        //get sheet
        const sheet=workbook.Sheets[workbook.SheetNames[0]];
        // convert excel data into json
        const rows=XLSX.utils.sheet_to_json(sheet);
        
        //check file empty
        if(!rows.length){
            return res.status(400).json({
                message:'File is empty',
            });
        }
// get all agent 
    const agents=await Agent.find();
    if(!agents.length){
return res.status(400).json({
    message:"No agent is available"
});
    }
    let tasks=[];
    // asign tasks one by one 
    for(let i=0;i<rows.length;i++){
        let agentIndex=i%agents.length;
        let task={
            firstName:rows[i].firstName,
            phone:rows[i].phone,
            notes:rows[i].notes,
            assignedAgent:agents[agentIndex]._id
        };
        tasks.push(task)
    }
    // save all tasks
    await Task.insertMany(tasks);
    return res.status(201).json({
        message:"Task assigned successfully",
        totalTasks:tasks.length
    });
    } 
    catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
}
module.exports={uploadFile}