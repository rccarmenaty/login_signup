const express = require("express");
const router = express.Router();
const { createProveedor, list } = require("../controllers/proveedor");
const { protect } = require("../middleware/auth");

router.route("/create").post(protect, createProveedor);
router.route("/list").get(protect, list);

module.exports = router;
