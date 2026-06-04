const Task = require("../models/task-model");
const Agent = require("../models/agent-model");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedAgent");

    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const assignAgentsToTasks = async (req, res) => {
  try {
    const agents = await Agent.find();
    if (!agents.length) {
      return res.status(400).json({
        message: "Add at least one agent first",
      });
    }

    const agentIds = agents.map((a) => a._id);

    const unassigned = await Task.find({
      $or: [
        { assignedAgent: null },
        { assignedAgent: { $exists: false } },
        { assignedAgent: { $nin: agentIds } },
      ],
    }).sort({ _id: 1 });

    if (!unassigned.length) {
      return res.status(200).json({
        message: "All tasks already have an agent",
        updated: 0,
      });
    }

    for (let i = 0; i < unassigned.length; i++) {
      const agent = agents[i % agents.length];
      unassigned[i].assignedAgent = agent._id;
      await unassigned[i].save();
    }

    return res.status(200).json({
      message: "Agents assigned to tasks",
      updated: unassigned.length,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getTasks,
  assignAgentsToTasks,
};