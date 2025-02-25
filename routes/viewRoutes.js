const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/", authMiddleware, async (req, res) => {
    const db = require("../config/database").getDB();
    const tasks = await db.collection("tasks").find().toArray();
    res.render("index", { tasks });
});

module.exports = router;