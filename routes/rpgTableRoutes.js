const express = require("express");
const router = express.Router();
const rpgTableController = require("../controllers/rpgTableController");

router.post("/", rpgTableController.createRpgTable);
router.get("/", rpgTableController.getAllRpgTables);
router.get("/:id", rpgTableController.getRpgTableById);
router.put("/:id", rpgTableController.updateRpgTable);
router.delete("/:id", rpgTableController.deleteRpgTable);

module.exports = router;
