const express = require("express");
const router = express.Router();

// Bosh sahifa
router.get("/", (req, res) => {
  res.render("index", { title: "my express app", greeting: "Asalomu alekum" });
});

module.exports = router;
