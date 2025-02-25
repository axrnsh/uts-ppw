const express = require("express");
const { register, login, logout } = require("../controllers/authController");

const router = express.Router();

// Cuma router biasa, router untuk autentikasi
// Nah ini server.js ada app.use("/auth", authRoutes);
// Jadi semua path di sini jadi /auth/register, /auth/login, /auth/logout
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
