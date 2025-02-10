const express = require("express");
const router = express.Router();

router.get("/admin/categories/New", (req, res) => {
  res.render("admin/categories/New");
});

router.get("/categories", (req, res) => {
  res.render("admin/categories/New");
});



module.exports = router;
// Compare this snippet from app.js:    
