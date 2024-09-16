const express = require("express");
const router = express.Router();
const {
  createRpgTable,
  getAllRpgTables,
  getRpgTableById,
  updateRpgTable,
  deleteRpgTable,
} = require("../controllers/rpgTableController");

router.post("/add-table", createRpgTable);
router.get("/", getAllRpgTables);
router.get("/:id", getRpgTableById);
router.put("/:id", updateRpgTable);
router.delete("/:id", deleteRpgTable);

module.exports = router;
