const express = require("express");
const router = express.Router();
const { create, list, edit, remove } = require("../controllers/insumo");
const { protect } = require("../middleware/auth");

router.route("/create").post(protect, create);
router.route("/list").get(protect, list);
router.route("/edit").post(protect, edit);
router.route("/remove").post(protect, remove);

module.exports = router;
