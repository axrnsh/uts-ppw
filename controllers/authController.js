const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail } = require("../models/userModel");
require("dotenv").config();

// Register Pengguna
async function register(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Semua field harus diisi!" });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return res.status(400).json({ message: "Email sudah terdaftar!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser({ name, email, password: hashedPassword });

    res.status(201).json({ message: "Pendaftaran berhasil!", userId });
}

// Login Pengguna
async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email dan password diperlukan!" });
    }

    const user = await getUserByEmail(email);
    if (!user) {
        return res.status(400).json({ message: "Email tidak terdaftar!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Password salah!" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });

    res.json({ message: "Login berhasil!", token });
}

async function logout(req, res) {
    res.clearCookie("token");
    res.json({ message: "Logout berhasil!" });
}

module.exports = { register, login, logout };