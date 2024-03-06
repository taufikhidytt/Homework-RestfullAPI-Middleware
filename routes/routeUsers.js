const express = require("express");
const router = express.Router();
const db = require("../config/db");

// route get data dan paginate limit endpoint users
router.get("/", function (req, res) {
  const getData = `SELECT id, email, gender, role FROM users ${
    req.query.limit ? "LIMIT " + req.query.limit : ""
  }`;
  db.query(getData, function (error, result) {
    if (error) {
      throw error;
    } else {
      res.status(200).json(result.rows);
    }
  });
});

module.exports = router;
