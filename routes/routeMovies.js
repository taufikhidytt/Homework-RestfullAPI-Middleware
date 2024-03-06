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

// route get data by id
router.get("/:id", function (req, res) {
  const getDataById = `SELECT * FROM movies WHERE id = ${req.params.id}`;
  db.query(getDataById, function (error, result) {
    if (error) {
      throw error;
    } else {
      res.status(200).json(result.rows);
    }
  });
});

// route post movies
router.post("/", function (req, res) {
  db.query(`INSERT INTO movies ("id", "title", "genres", "year") VALUES ($1, $2, $3, $4)`,
    [req.body.id, req.body.title, req.body.genres, req.body.year], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({
        status: 'success',
      });
    });
});

// route put movies
router.put("/:id", function (req, res) {
  db.query(`UPDATE movies SET title = '${req.body.title}', genres = '${req.body.genres}', year = ${req.body.year} WHERE id = ${req.params.id}`, (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({
        status: 'success',
      });
    });
});

// route deleted movies
router.delete("/:id", function (req, res) {
  db.query(`DELETE FROM movies WHERE id = ${req.params.id}`, (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({
        status: 'success',
      });
    });
});

module.exports = router;
