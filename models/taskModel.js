const { getDB } = require("../config/database");
const { ObjectId } = require("mongodb"); // Import ObjectId untuk menangani ID MongoDB

async function createTask(taskData) {
  const db = getDB();
  const result = await db.collection("tasks").insertOne(taskData);
  return result.insertedId;
}

async function getAllTasks() {
  const db = getDB();
  return await db.collection("tasks").find().toArray();
}

async function getTaskById(id) {
  const db = getDB();
  return await db.collection("tasks").findOne({ _id: new ObjectId(id) });
}

async function updateTask(id, updatedData) {
  const db = getDB();
  return await db.collection("tasks").updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedData }
  );
}

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
