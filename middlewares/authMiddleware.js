const jwt = require("jsonwebtoken");
require("dotenv").config();

function authMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        console.log("Tidak ada token, redirect ke login...");
        return res.redirect("/login");
    }

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
