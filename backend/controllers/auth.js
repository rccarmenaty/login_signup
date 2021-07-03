const { User, Token } = require("../models");
const ErrorResponse = require("../utils/errorResponse");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (password.length < 6)
    return next(new ErrorResponse("Password at least 6 characters", 400));

  try {
    const username_check = await User.findOne({ where: { username } });

    if (username_check)
      return next(new ErrorResponse("Username already exists", 400));

    const user_check = await User.findOne({ where: { email } });

    if (user_check) return next(new ErrorResponse("Email already exists", 400));

    const salt = await bcrypt.genSalt(10);

    const password_hash = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      email,
      password: password_hash,
    });

    createToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};
exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ErrorResponse("Please provide email and password", 400));
  }

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) return next(new ErrorResponse("Invalid Credentials", 401));

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid Credentials", 401));
    }

    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorResponse("Failed to Log In"));
  }
};

exports.refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;
  const user = req.user;

  try {
    const token = await Token.findOne({ where: { uuid: user.uuid } });

    if (token.token !== refreshToken)
      return next(new ErrorResponse("Tokens not matching"));
  } catch (error) {
    return next(new ErrorResponse("Database Error"));
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH);
    if (decoded.id !== user.uuid)
      return next(new ErrorResponse("User unknown"));
    res.status(304).json("Unmodified");
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      sendToken(user, 201, res);
    } else {
      res.status(500).json("Error: " + err);
    }
  }
};

exports.logout = async (req, res, next) => {
  const user = req.user;

  const savedToken = await Token.update(
    {
      token: "",
      uuid: user.uuid,
    },
    {
      where: { uuid: user.uuid },
    }
  );

  if (!savedToken) res.status(500).json("Error accesing database");
  else res.status(200).json("Logged out correctly");
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

const sendToken = async (user, statusCode, res) => {
  const token = user.getSignedToken();
  const refreshToken = user.getRefreshToken();

  const savedToken = await Token.update(
    {
      token: refreshToken,
      uuid: user.uuid,
    },
    {
      where: { uuid: user.uuid },
    }
  );

  if (!savedToken) res.status(500).json("Error accessing database");
  else {
    res
      .status(statusCode)
      .json({ token, refreshToken, username: user.username });
  }
};

const createToken = async (user, statusCode, res) => {
  const token = user.getSignedToken();
  const refreshToken = user.getRefreshToken();

  const savedToken = await Token.create({
    token: refreshToken,
    uuid: user.uuid,
  });

  if (!savedToken) res.status(500).json("Error accessing database");
  else
    res
      .status(statusCode)
      .json({ token, refreshToken, username: user.username });
};
