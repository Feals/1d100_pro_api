const express = require("express");
const router = express.Router();
const upload = require("../config/fileUpload.config");
const {
  createRpg,
  getAllRpgs,
  getRpgById,
  updateRpg,
  deleteRpg,
} = require("../controllers/rpgController");

router.post("/add-rpg", upload.single("file"), createRpg);
router.get("/rpgs", getAllRpgs);
router.get("/rpgs/:id", getRpgById);
router.put("/rpgs/:id", updateRpg);
router.delete("/rpgs/:id", deleteRpg);

module.exports = router;
