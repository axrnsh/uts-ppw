const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Router untuk view
// Jika kita akses /register atau /
// Maka akan diarahkan ke register.ejs atau index.ejs

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/", authMiddleware, async (req, res) => {
    const db = require("../config/database").getDB();
    const tasks = await db.collection("tasks").find().toArray();
    res.render("index", { tasks });
});

module.exports = router;