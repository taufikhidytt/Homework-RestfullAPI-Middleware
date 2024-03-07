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
      res.json({
        status: 200,
        message: "success get data",
        data: result.rows,
      });
    }
  });
});

// route get data by id
router.get("/:id", function (req, res) {
  const getDataById = `SELECT id, email, gender, role FROM users WHERE id = ${req.params.id}`;
  db.query(getDataById, function (error, result) {
    if (error) {
      throw error;
    } else {
      res.json({
        status: 200,
        message: "success get data by id",
        data: result.rows,
      });
    }
  });
});

// route post users
router.post("/", function (req, res) {
  const queryInsert = `INSERT INTO users ("id", "email", "gender", "password", "role") VALUES ($1, $2, $3, $4, $5)`;
  db.query(
    queryInsert,
    [
      req.body.id,
      req.body.email,
      req.body.gender,
      req.body.password,
      req.body.role,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.json({
        status: 200,
        message: "success insert data users",
      });
    }
  );
});

// route put users
router.put("/:id", function (req, res) {
  const queryUpdate = `UPDATE users SET email = '${req.body.email}', gender = '${req.body.gender}', password = '${req.body.password}', role = '${req.body.role}' WHERE id = ${req.params.id}`;
  db.query(queryUpdate, (error, results) => {
    if (error) {
      throw error;
    }
    res.json({
      status: 200,
      message: "success updated data users",
    });
  });
});

// route deleted users
router.delete("/:id", function (req, res) {
  const queryDeleted = `DELETE FROM users WHERE id = ${req.params.id}`;
  db.query(queryDeleted, (error, results) => {
    if (error) {
      throw error;
    }
    res.json({
      status: 200,
      message: "success deleted data users",
    });
  });
});

/**
 * @swagger
 * components:
 *  schemas:
 *    users:
 *      type: object
 *      required:
 *        - id
 *        - email
 *        - gender
 *        - password
 *        - role
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto generated id of the users
 *        email:
 *          type: string
 *          description: The text email
 *        gender:
 *          type: string
 *          description: The text gender
 *        password:
 *          type: string
 *          description: The text password
 *        role:
 *          type: string
 *          description: The text role
 *      example:
 *        id: 101
 *        email: avatars@gmail.com
 *        gender: Male
 *        password: password
 *        role: avatar
 */

module.exports = router;
