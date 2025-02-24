const { getDB } = require("../config/database");

async function createUser(userData) {
  const db = getDB();
  const result = await db.collection("users").insertOne(userData);
  return result.insertedId;
}

async function getUserByEmail(email) {
  const db = getDB();
  return await db.collection("users").findOne({ email });
}

async function getUserById(id) {
  const db = getDB();
  return await db.collection("users").findOne({ _id: new id });
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
};