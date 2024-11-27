const path = require("path");
const fileTypeValidator = (file) => {
  console.log(file);
  const fileTypes = /jpeg|jpg|png|gif/; // regex for file types
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  return extname && mimeType;
};

module.exports = { fileTypeValidator };
