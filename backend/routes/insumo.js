const express = require("express");
const router = express.Router();
const {
  create,
  list,
  edit,
  remove,
  getInfo,
} = require("../controllers/insumo");

router.route("/").post(create);
router.route("/").get(list);
router.route("/:uuid").put(edit);
router.route("/:uuid").delete(remove);
router.route("/:uuid").get(getInfo);

module.exports = router;
