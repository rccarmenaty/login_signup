const express = require("express");
const router = express.Router();
const {
  create,
  list,
  edit,
  remove,
  getInfo,
  add_cosecha,
} = require("../controllers/lote");
const { protect } = require("../middleware/auth");

router.route("/create").post(protect, create);
router.route("/list").get(protect, list);
router.route("/edit").post(protect, edit);
router.route("/remove").post(protect, remove);
router.route("/add_cosecha").post(protect, add_cosecha);
router.route("/info/:uuid").get(protect, getInfo);

module.exports = router;
