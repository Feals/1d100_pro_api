const express = require("express");
const router = express.Router();
const upload = require("../config/fileUpload.config");

const {
  createRpg,
  getAllRpgsWithGenres,
  getRpgById,
  updateRpg,
  deleteRpg,
} = require("../controllers/rpgController");

router.post("/add-rpg", upload.single("file"), createRpg);
router.get("/", getAllRpgsWithGenres);
router.get("/:id", getRpgById);
router.put("/:id", upload.single("file"), updateRpg);
router.delete("/:id", deleteRpg);

module.exports = router;
