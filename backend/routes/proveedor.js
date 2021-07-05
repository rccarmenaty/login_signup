const express = require("express");
const router = express.Router();
const {
  create,
  list,
  edit,
  remove,
  add_insumo,
  remove_insumo,
  getInfo,
} = require("../controllers/proveedor");

router.route("/").post(create);
router.route("/").get(list);
router.route("/:uuid").put(edit);
router.route("/:uuid").delete(remove);
router.route("/addInsumo").post(add_insumo);
router.route("/delInsumo").post(remove_insumo);
router.route("/:uuid").get(getInfo);

module.exports = router;
