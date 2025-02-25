const { getDB } = require("../config/database");
const { ObjectId } = require("mongodb"); // Import ObjectId untuk menangani ID MongoDB

// Fungsi untuk membuat task baru
async function createTask(taskData) {
  const db = getDB();
  const result = await db.collection("tasks").insertOne(taskData);
  return result.insertedId;
}

// Fungsi untuk mengambil semua task
async function getAllTasks(filter = {}) {
  const db = getDB();
  return await db.collection("tasks").find(filter).toArray();
}

// Fungsi untuk mengambil task berdasarkan ID (sekali lagi ini ga kepakai tapi gapapa biarin aja)
async function getTaskById(id) {
  const db = getDB();
  return await db.collection("tasks").findOne({ _id: new ObjectId(id) });
}

// Fungsi untuk mengupdate task
async function updateTask(id, updatedData) {
  const db = getDB();
  return await db.collection("tasks").updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedData }
  );
}

// Fungsi untuk menghapus task
async function deleteTask(id) {
  const db = getDB();
  return await db.collection("tasks").deleteOne({ _id: new ObjectId(id) }); 
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
