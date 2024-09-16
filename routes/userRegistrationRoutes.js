const express = require("express");
const router = express.Router();
const {
  checkUserRegistrations,
  subscribeUserToTable,
  unsubscribeUserToTable,
} = require("../controllers/userRegistrationsController");

router.get("/user-registrations/:id", checkUserRegistrations);
router.post("/subscribe", subscribeUserToTable);
router.delete("/unsubscribe", unsubscribeUserToTable);

module.exports = router;
