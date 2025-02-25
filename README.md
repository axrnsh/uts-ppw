# Manajemen Tugas - UTS Perancangan dan Programan Web II

## Instalasi & Menjalankan Proyek
### **1. Clone dan install dependencies**
1. Clone repository ini
   ```sh
   git clone https://github.com/axrnsh/uts-ppw.git
   cd uts-ppw
   ```
2. Install dependencies
   ```sh
   npm install
   ```

### **2. Mengatur database MongoDB**
1. Pastikan MongoDB telah terinstall dan berjalan. 
2. Buat database bernama `db_task` di MongoDB.  
3. Struktur collections:
   - `users` (untuk autentikasi)  
   - `tasks` (untuk menyimpan daftar tugas)

### **3. Menjalankan server**
1. Jalankan server dengan start
   ```sh
   npm run start
   ```
2. Atau jalankan secara normal
   ```sh
   node server.js
   ```
3. **Akses aplikasi di**  
   ```
   http://localhost:5000
   ```

---

### **4. Fitur utama**
✅ **CRUD Task**: tambah, edit, hapus, dan filter tugas berdasarkan kategori dan status.  
✅ **Notifikasi Real-time**: menggunakan WebSocket untuk memperbarui tugas tanpa refresh.  
✅ **Autentikasi**: login & register dengan JWT (Token disimpan di Cookie).  
✅ **Desain Responsif**: menggunakan **Bootstrap** untuk UI yang rapi.

---

### **5. Kekurangan**
❌ **Task Tidak Berbasis User**  
   - Saat ini semua tugas tersimpan secara global di database.  
   - Akan diperbaiki jika memungkinkan

---

### **6. Tech stack**
- **Backend**: Node.js, Express.js, MongoDB, WebSocket  
- **Frontend**: EJS, Bootstrap, jQuery  
- **Autentikasi**: JWT (JSON Web Token)  

---

### **7. API endpoints**
| Method | Endpoint         | Deskripsi                 |
|--------|-----------------|---------------------------|
| POST   | `/auth/register` | Register pengguna        |
| POST   | `/auth/login`    | Login pengguna           |
| GET    | `/tasks`        | Ambil semua tugas        |
| POST   | `/tasks`        | Tambah tugas baru        |
| PUT    | `/tasks/:id`    | Edit tugas berdasarkan ID |
| DELETE | `/tasks/:id`    | Hapus tugas berdasarkan ID |

---
