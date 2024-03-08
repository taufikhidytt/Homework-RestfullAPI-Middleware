const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const { verifyToken } = require("../middlewares/auth");

// route get data dan paginate limit endpoint users
router.get("/", function (req, res) {
  const accessToken = verifyToken(req.body.token);
  if (accessToken === "invalid") {
    res.json({
      status: 403,
      message: "invalid JWT token",
    });
  } else {
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
          token: req.body.token,
          data: result.rows,
        });
      }
    });
  }
});

// route get data by id
router.get("/:id", function (req, res) {
  const accessToken = verifyToken(req.body.token);
  if (accessToken === "invalid") {
    res.json({
      status: 403,
      message: "invalid JWT token",
    });
  } else {
    const getDataById = `SELECT id, email, gender, role FROM users WHERE id = ${req.params.id}`;
    db.query(getDataById, function (error, result) {
      if (error) {
        throw error;
      } else if (result.rowCount === 0) {
        res.json({
          status: 404,
          message: "data not found",
          data: result.rows,
        });
      } else {
        res.json({
          status: 200,
          message: "success get data by id",
          token: req.body.token,
          data: result.rows,
        });
      }
    });
  }
});

// route post users
router.post("/", function (req, res) {
  const accessToken = verifyToken(req.body.token);
  if (accessToken === "invalid") {
    res.json({
      status: 403,
      message: "invalid JWT token",
    });
  } else {
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
            message: "success insert data users",
            token: req.body.token,
          });
        }
      }
    );
  }
});

// route put users
router.put("/:id", function (req, res) {
  const accessToken = verifyToken(req.body.token);
  if (accessToken === "invalid") {
    res.json({
      status: 403,
      message: "invalid JWT token",
    });
  } else {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    const queryUpdate = `UPDATE users SET email = '${req.body.email}', gender = '${req.body.gender}', password = '${hash}', role = '${req.body.role}' WHERE id = ${req.params.id}`;
    db.query(queryUpdate, (error, results) => {
      if (error) {
        throw error;
      } else {
        res.json({
          status: 200,
          message: "success updated data users",
          token: req.body.token,
        });
      }
    });
  }
});

// route deleted users
router.delete("/:id", function (req, res) {
  const accessToken = verifyToken(req.body.token);
  if (accessToken === "invalid") {
    res.json({
      status: 403,
      message: "invalid JWT token",
    });
  } else {
    const queryDeleted = `DELETE FROM users WHERE id = ${req.params.id}`;
    db.query(queryDeleted, (error, results) => {
      if (error) {
        throw error;
      } else {
        res.json({
          status: 200,
          message: "success deleted data users",
          token: req.body.token,
        });
      }
    });
  }
});

/**
 * @swagger
 * components:
 *  schemas:
 *    Users:
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

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The Users managing API
 * /api/users:
 *    get:
 *      summary: Get all data users
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 *    responses:
 *      200:
 *        description: The get users
 *        contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 *      500:
 *        description: Some server error
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The Users managing API
 * /api/users/{id}:
 *    get:
 *      summary: Get data users by id
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 *    responses:
 *      200:
 *        description: The get users
 *        contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 *      500:
 *        description: Some server error
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The Users managing API
 * /api/users:
 *    post:
 *      summary: Create new users
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 *    responses:
 *      200:
 *        description: The created users
 *        contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 *      500:
 *        description: Some server error
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The Users managing API
 * /api/users/{id}:
 *    put:
 *      summary: Update users by id
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 *    responses:
 *      200:
 *        description: The created users
 *        contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 *      500:
 *        description: Some server error
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The Users managing API
 * /api/users/{id}:
 *    delete:
 *      summary: Delete users by id
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 *    responses:
 *      200:
 *        description: The created users
 *        contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 *      500:
 *        description: Some server error
 */

module.exports = router;
