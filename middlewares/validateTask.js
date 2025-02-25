function validateTask(req, res, next) {
    const { title, category, deadline, status } = req.body;

    // Cek apakah field title, category, deadline, dan status ada, kalau ga ada return 400 beserta message
    if (!title || !category || !deadline || !status) {
        return res.status(400).json({ message: "Semua field harus diisi!" });
    }

    // Lanjut ke middleware selanjutnya
    next();
}

module.exports = validateTask;
