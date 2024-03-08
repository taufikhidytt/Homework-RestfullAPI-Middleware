const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { signToken } = require("../middlewares/auth");
const bcrypt = require("bcryptjs");

// route login
router.post("/login", function (req, res) {
  const queryCheckUsers = `SELECT * FROM users WHERE email = '${req.body.email}'`;
  db.query(queryCheckUsers, (error, results) => {
    if (results.rowCount === 0) {
      res.json({
        status: 404,
        message: "data email users not found",
      });
    } else if (error) {
      throw error;
    } else {
      let passwordHash = results.rows[0].password;
      let checkPassword = bcrypt.compareSync(req.body.password, passwordHash);
      if (checkPassword === false) {
        res.json({
          status: 404,
          message: "data password users not found",
        });
      } else if (checkPassword) {
        const token = signToken(results.rows[0]);
        res.json({
          status: 200,
          message: "success login",
          token: token,
          data: results.rows,
        });
      }
    }
  });
});

// route post users
router.post("/register", function (req, res) {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(req.body.password, salt);
  const queryInsert = `INSERT INTO users ("id", "email", "gender", "password", "role") VALUES ($1, $2, $3, $4, $5)`;
  db.query(
    queryInsert,
    [req.body.id, req.body.email, req.body.gender, hash, req.body.role],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.json({
          status: 200,
          message: "success register data users",
        });
      }
    }
  );
});

module.exports = router;
