const express = require("express");
const {
  addTask,
  getTasks,
  getTask,
  editTask,
  removeTask,
} = require("../controllers/taskController");

const authMiddleware = require("../middlewares/authMiddleware");
const validateTask = require("../middlewares/validateTask");

const router = express.Router();

router.post("/", authMiddleware, validateTask, addTask);
router.get("/", authMiddleware, getTasks);
router.get("/:id", authMiddleware, getTask);
router.put("/:id", authMiddleware, validateTask, editTask);
router.delete("/:id", authMiddleware, removeTask);

module.exports = router;