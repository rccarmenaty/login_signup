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

router.route("/").post(create);
router.route("/").get(list);
router.route("/:uuid").put(edit);
router.route("/:uuid").delete(remove);
// router.route("/add_insumo").post(add_insumo);
router.route("/:uuid").get(getInfo);

module.exports = router;
