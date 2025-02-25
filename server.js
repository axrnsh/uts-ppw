// Main entry point buat server, buat jalankan server dan connect ke database.
const express = require("express");
const { connectDB, closeDB } = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const { webSocket } = require("./public/websocket");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const viewRoutes = require("./routes/viewRoutes");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/", viewRoutes);

const server = http.createServer(app);
web(server);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });
});

process.on("SIGINT", async () => {
  await closeDB();
  process.exit(0);
});