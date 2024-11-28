const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateJWT = (req, res, next) => {
  //console.log("Authorization Header:", req.header("Authorization"));

  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res
      .status(403)
      .json({ message: "No token provides, authorization denied." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ message: "Invalid token, authorization denied." });
  }
};

module.exports = authenticateJWT;
