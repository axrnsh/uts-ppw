const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { ObjectId } = require("mongodb");

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
    const user = await db.collection("users").findOne({ _id: new ObjectId(req.user.id) });
    res.render("index", { tasks, user });
});

module.exports = router;