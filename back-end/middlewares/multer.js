const multer = require("multer");
const path = require("path");

// conf where storing the images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// filter acepting images content-types
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image file are allowed"), false);
    }
};

const upload = multer({ storage, fileFilter, limits: { files: 5 } });

module.exports = upload;
