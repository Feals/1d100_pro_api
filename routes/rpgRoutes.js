const express = require("express");
const router = express.Router();
const rpgController = require("../controllers/rpgController");

router.post("/", rpgController.createRpg);
router.get("/", rpgController.getAllRpgs);
router.get("/:id", rpgController.getRpgById);
router.put("/:id", rpgController.updateRpg);
router.delete("/:id", rpgController.deleteRpg);

module.exports = router;
