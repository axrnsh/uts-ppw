const { getDB } = require("../config/database");

// Fungsi untuk membuat user baru
async function createUser(userData) {
  const db = getDB();
  const result = await db.collection("users").insertOne(userData);
  return result.insertedId;
}

// Fungsi untuk mengambil user berdasarkan email
async function getUserByEmail(email) {
  const db = getDB();
  return await db.collection("users").findOne({ email });
}

// Fungsi untuk mengambil user berdasarkan ID
async function getUserById(id) {
  const db = getDB();
  return await db.collection("users").findOne({ _id: new id });
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
};