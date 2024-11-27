const { cloudinaryUpload } = require("../service/fileService.js");

const fileController = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({
        error: { description: "File not presend in the request body." },
      });
    }

    if (Array.isArray(req.files) && req.files.length === 0) {
      return res
        .status(400)
        .json({ error: { description: "No file uploaded" } });
    }
    const file = req.files[0];
    const response = await cloudinaryUpload(file);
    return res
      .status(200)
      .json({ message: "File uploaded successfully", uploadResult: response });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { fileController };
