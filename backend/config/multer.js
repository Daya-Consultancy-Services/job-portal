const multer = require("multer");

// Multer Setup for File Upload
const storage = multer.memoryStorage(); // Store file in memory as Buffer

const upload = multer({ storage });

module.exports = upload;
