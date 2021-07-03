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

router.route("/create").post(create);
router.route("/list").get(list);
router.route("/edit").post(edit);
router.route("/remove").post(remove);
router.route("/add_cosecha").post(add_cosecha);
router.route("/info/:uuid").get(getInfo);

module.exports = router;
