const { User } = require("../models");
const ErrorResponse = require("../utils/errorResponse");
const bcrypt = require("bcryptjs");

exports.register = async (req, res, next) => {
  const { user_full_name, user_name, user_email, user_password } = req.body;

  if (user_password.length < 6)
    return next(new ErrorResponse("Password at least 6 characters", 400));

  try {
    const user_check = await User.findOne({ where: { user_email } });

    if (user_check) return next(new ErrorResponse("Email already exists", 400));

    const salt = await bcrypt.genSalt(10);

    const password = await bcrypt.hash(user_password, salt);
    const user = await User.create({
      user_full_name,
      user_name,
      user_email,
      user_password: password,
    });

    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};
exports.login = async (req, res, next) => {
  const { user_email, user_password } = req.body;

  if (!user_email || !user_password) {
    return next(new ErrorResponse("Please provide email and password", 400));
  }

  try {
    const user = await User.findOne({ where: { user_email } });

    console.log(JSON.stringify(user));

    if (!user) return next(new ErrorResponse("Invalid Credentials", 401));

    const isMatch = await user.matchPasswords(user_password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid Credentials", 401));
    }

    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

exports.forgotpassword = (req, res, next) => {
  res.send("Forgot Password Route");
};

exports.resetpassword = (req, res, next) => {
  res.send("Reset Password Route");
};

exports.info = (req, res, next) => {
  res.send("ALl good INFO");
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};
