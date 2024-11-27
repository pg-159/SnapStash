const express = require("express");
const fs = require("fs");
const { fileRouter } = require("./src/router/fileRouter.js");

const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

const uploadDir = path.join("uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use("/src/uploads", express.static("src/uploads"));

app.use("/files", fileRouter);

app.use("/", (req, res) => {
  res.send("welcome to file/image upload");
});
const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
