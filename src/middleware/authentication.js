const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateJWT = (req, res, next) => {
  console.log("Authorization Header:", req.header("Authorization"));

  const jwtToken = req.header("Authorization")?.split(" ")[1];
  if (!jwtToken) {
    return res
      .status(403)
      .json({ message: "No token provides, authorization denied." });
  }

  try {
    const decodedHeader = JSON.parse(
      Buffer.from(jwtToken.split(".")[0], "base64").toString()
    );
    console.log("Decoded header:", decodedHeader);
    console.log("JWT secret:", process.env.JWT_SECRET);
    console.log("token", jwtToken);
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
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
