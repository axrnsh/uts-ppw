const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware untuk autentikasi pengguna
function authMiddleware(req, res, next) {
    // Token buat login
    let token = req.cookies.token; 

    // Kalau ga ketemu token dari cookie, cari di header
    if (!token && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        if (authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1]; 
        }
    }

    // Kalau ga ketemu token sama sekali, kembalikan ke halaman login
    if (!token) {
        console.log("Tidak ada token! Akses ditolak.");
        return res.redirect("/login");
    }

    // Verfikasi token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("JWT Error:", err);
        res.clearCookie("token");
        return res.redirect("/login");
    }
}

module.exports = authMiddleware;
