const express = require("express");
const router = express.Router();

const {
  getTasks,
} = require("../controllers/task_controller");

router.get("/", getTasks);

module.exports = router;