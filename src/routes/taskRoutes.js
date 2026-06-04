const express = require("express");
const router = express.Router();

const {
  getTasks,
  assignAgentsToTasks,
} = require("../controllers/task_controller");

router.get("/", getTasks);
router.post("/assign-agents", assignAgentsToTasks);

module.exports = router;