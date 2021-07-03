const jwt = require("jsonwebtoken");
const { User, Token } = require("../models");
const ErrorResponse = require("../utils/errorResponse");

exports.protect = async (req, res, next) => {
  let token = false;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 403));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { uuid: decoded.id } });

    if (!user) return next(new ErrorResponse("User not found", 404));

    req.user = user;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return next(new ErrorResponse(error.message, 410));
    return next(new ErrorResponse("Database Error"));
  }
};
