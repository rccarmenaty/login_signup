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

router.route("/create").post(create);
router.route("/list").get(list);
router.route("/edit").post(edit);
router.route("/remove").post(remove);
router.route("/add_insumo").post(add_insumo);
router.route("/info/:uuid").get(getInfo);

module.exports = router;
