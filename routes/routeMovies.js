const express = require("express");
const router = express.Router();
const db = require("../config/db");

// route get data dan paginate limit endpoint movies
router.get("/", function (req, res) {
  const getData = `SELECT * FROM movies ${
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
