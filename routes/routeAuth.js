const express = require("express");
const router = express.Router();
const db = require("../config/db");
const {signToken} = require('../helpers/auth');


// route login
router.post("/login", function (req, res) {
  const queryCheckUsers = `SELECT email, password FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;
  db.query( queryCheckUsers, (error, results) => {
      if (error) {
        throw error;
      }
      const token = signToken(results.rows[0]);
      res.json({
        status: 200,
        token: token,
        message: "success login",
        data: results.rows
      });
    }
  );
});

module.exports = router;
