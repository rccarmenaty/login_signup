const express = require("express");
const router = express.Router();
const { refreshToken, logout } = require("../controllers/auth");

router.route("/refresh").post(refreshToken);
router.route("/logout").post(logout);

module.exports = router;
