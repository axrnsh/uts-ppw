const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require("../models/taskModel");

// Tambah tugas baru
async function addTask(req, res) {
    try {
        const taskId = await createTask(req.body);
        res.status(201).json({ message: "Tugas berhasil ditambahkan!", taskId });
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
        await updateTask(req.params.id, req.body);
        res.json({ message: "Tugas berhasil diperbarui!" });
    } catch (err) {
        res.status(500).json({ message: "Gagal memperbarui tugas!" });
    }
}

// Hapus tugas
async function removeTask(req, res) {
    try {
        await deleteTask(req.params.id);
        res.json({ message: "Tugas berhasil dihapus!" });
    } catch (err) {
        res.status(500).json({ message: "Gagal menghapus tugas!" });
    }
}

module.exports = { addTask, getTasks, getTask, editTask, removeTask };