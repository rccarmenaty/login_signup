const express = require("express");
const router = express.Router();
const {
  create,
  list,
  edit,
  remove,
  add_insumo,
  getInfo,
} = require("../controllers/cosecha");
const { protect } = require("../middleware/auth");

router.route("/create").post(protect, create);
router.route("/list").get(protect, list);
router.route("/edit").post(protect, edit);
router.route("/remove").post(protect, remove);
router.route("/add_insumo").post(protect, add_insumo);
router.route("/info/:uuid").get(protect, getInfo);

module.exports = router;
