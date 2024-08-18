const multer = require("multer");
const path = require("node:path");
const fs = require("fs");

// Function to create the upload directory if it doesn't exist
function createUploadDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Dynamic storage configuration based on a subfolder name
const storageConfig = (subfolder) => multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, '../../../public/', subfolder);
    createUploadDir(uploadsDir);
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter for filtering only images
const fileFilterConfig = function(req, file, cb) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Create a function to create your multer instance
function createMulter(subfolder) {
  return multer({
    storage: storageConfig(subfolder), 
    limits: { fileSize: 1024 * 1024 * 10 }, // File size limit (10 MB)
    fileFilter: fileFilterConfig,
  });
}

module.exports = createMulter; // Export the function instead of a direct instance
