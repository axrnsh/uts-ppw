const express = require("express");
const { connectDB, closeDB } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });
});

process.on("SIGINT", async () => {
  await closeDB();
  process.exit(0);
});