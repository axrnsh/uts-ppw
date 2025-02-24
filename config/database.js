const { MongoClient } = require("mongodb");
require("dotenv").config(); 

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "db_task";

let client;
let db;

async function connectDB() {
  try {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    db = client.db(dbName);

    console.log(`Connected to MongoDB: ${dbName}`);
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); 
  }
}

function getDB() {
  if (!db) {
    throw new Error("Database not connected. ");
  }
  return db;
}

async function closeDB() {
  if (client) {
    await client.close();
    console.log("MongoDB connection closed.");
  }
}

module.exports = { connectDB, getDB, closeDB };
