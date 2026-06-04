const Task = require("../models/task_model");

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

module.exports = {
  getTasks,
};