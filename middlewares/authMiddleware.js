const jwt = require("jsonwebtoken");
require("dotenv").config(); 

function authMiddleware(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Akses ditolak, token tidak ada" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ message: "Token tidak valid" });
  }
}

module.exports = authMiddleware;
