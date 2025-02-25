const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require("../models/taskModel");
const { broadcast } = require("../websocket");

// Tambah tugas baru
async function addTask(req, res) {
    try {
        const { title, category, deadline } = req.body;
        const newTask = { title, category, deadline, status: "Belum Selesai" };
        const task_id = await createTask(newTask);

        newTask._id = task_id; // Tambahkan ID tugas
        broadcast({ type: "NEW_TASK", data: newTask });

        res.status(201).json({ message: "Tugas berhasil ditambahkan!", task_id });
    } catch (err) {
        res.status(500).json({ message: "Gagal menambahkan tugas!" });
    }
}

// Ambil semua tugas
async function getTasks(req, res) {
    try {
        const { category, status } = req.query;
        let filter = {};

        if (category) {
            filter.category = category;
        }

        if (status) {
            filter.status = status;
        }

        const tasks = await getAllTasks(filter);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Gagal mengambil tugas!" });
    }
}


// Ambil tugas berdasarkan ID
async function getTask(req, res) {
    try {
        const task = await getTaskById(req.params.id);
        if (!task) return res.status(404).json({ message: "Tugas tidak ditemukan!" });

        res.json(task);
    } catch (err) {
        res.status(500).json({ message: "Gagal mengambil tugas!" });
    }
}

// Update tugas
async function editTask(req, res) {
    try {
        const { title, category, deadline, status } = req.body;
        const updated = await updateTask(req.params.id, { title, category, deadline, status });

        if (!updated) {
            return res.status(404).json({ message: "Tugas tidak ditemukan!" });
        }

        broadcast({ type: "EDIT_TASK", data: { _id: req.params.id, title, category, deadline, status } });
        res.json({ message: "Tugas berhasil diperbarui!" });
    } catch (err) {
        res.status(500).json({ message: "Gagal memperbarui tugas!" });
    }
}

// Hapus tugas
async function removeTask(req, res) {
    try {
        const deleted = await deleteTask(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Tugas tidak ditemukan!" });
        }

        broadcast({ type: "DELETE_TASK", data: { _id: req.params.id } });
        res.json({ message: "Tugas berhasil dihapus!" });
    } catch (err) {
        res.status(500).json({ message: "Gagal menghapus tugas!" });
    }
}

module.exports = { addTask, getTasks, getTask, editTask, removeTask };