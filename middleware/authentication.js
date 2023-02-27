const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");
const User = require("../models/User");

const auth = async (req, res, next) => {
  const autHeader = req.headers.authorization;
  if (!autHeader || !autHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = autHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    // this is alternative code
    // const user = await User.findById(payload.userId).select("-password");
    // console.log("line14", user);
    // req.user = user;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
