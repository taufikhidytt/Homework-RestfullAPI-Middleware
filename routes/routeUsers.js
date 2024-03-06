const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", function (req, res) {
  db.query(
    "SELECT id, email, gender, role FROM users",
    function (error, result) {
      if (error) {
        throw error;
      } else {
        res.status(200).json(result.rows);
      }
    }
  );
});

module.exports = router;
