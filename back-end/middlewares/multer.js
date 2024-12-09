const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set up the storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const filenameWithoutExt = file.originalname.replace(/\s+/g, '_').replace(path.extname(file.originalname), '');
    const extension = path.extname(file.originalname);

    let uniqueFilename = Date.now() + '_' + filenameWithoutExt + extension;

    const filePath = path.join('uploads', uniqueFilename);
    let counter = 1;

    while (fs.existsSync(filePath)) {
      uniqueFilename = Date.now() + '_' + filenameWithoutExt + `_${counter}` + extension;
      filePath = path.join('uploads', uniqueFilename);
      counter++;
    }

    cb(null, uniqueFilename);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).array('images', 5); 

module.exports = upload;
