const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { verifyToken } = require("../middlewares/auth");

// route get data dan paginate limit endpoint movies
router.get("/", function (req, res) {
  const accessToken = verifyToken(req.body.token);
  if (accessToken === "invalid") {
    res.json({
      status: 403,
      message: "invalid JWT token",
    });
  } else {
    const getData = `SELECT * FROM movies ${
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
    const getDataById = `SELECT * FROM movies WHERE id = ${req.params.id}`;
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

// route post movies
router.post("/", function (req, res) {
  const accessToken = verifyToken(req.body.token);
  if (accessToken === "invalid") {
    res.json({
      status: 403,
      message: "invalid JWT token",
    });
  } else {
    const queryInsert = `INSERT INTO movies ("id", "title", "genres", "year") VALUES ($1, $2, $3, $4)`;
    db.query(
      queryInsert,
      [req.body.id, req.body.title, req.body.genres, req.body.year],
      (error, results) => {
        if (error) {
          throw error;
        } else {
          res.json({
            status: 200,
            message: "success insert data movies",
            token: req.body.token,
          });
        }
      }
    );
  }
});

// route put movies
router.put("/:id", function (req, res) {
  const accessToken = verifyToken(req.body.token);
  if (accessToken === "invalid") {
    res.json({
      status: 403,
      message: "invalid JWT token",
    });
  } else {
    const queryUpdate = `UPDATE movies SET title = '${req.body.title}', genres = '${req.body.genres}', year = ${req.body.year} WHERE id = ${req.params.id}`;
    db.query(queryUpdate, (error, results) => {
      if (error) {
        throw error;
      } else {
        res.json({
          status: 200,
          message: "success updated data movies",
          token: req.body.token,
        });
      }
    });
  }
});

// route deleted movies
router.delete("/:id", function (req, res) {
  const accessToken = verifyToken(req.body.token);
  if (accessToken === "invalid") {
    res.json({
      status: 403,
      message: "invalid JWT token",
    });
  } else {
    const queryDeleted = `DELETE FROM movies WHERE id = ${req.params.id}`;
    db.query(queryDeleted, (error, results) => {
      if (error) {
        throw error;
      } else {
        res.json({
          status: 200,
          message: "success deleted data movies",
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
 *    Movies:
 *      type: object
 *      required:
 *        - id
 *        - title
 *        - genres
 *        - year
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto generated id of the movies
 *        title:
 *          type: string
 *          description: The text title
 *        genres:
 *          type: string
 *          description: The text genres
 *        year:
 *          type: string
 *          description: The text year
 *      example:
 *        id: 101
 *        title: Avatars
 *        genres: Action
 *        year: 2024
 */

/**
 * @swagger
 * tags:
 *  name: Movies
 *  description: The Movies managing API
 * /api/movies:
 *    get:
 *      summary: Get all data movies
 *      tags: [Movies]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movies'
 *    responses:
 *      200:
 *        description: The get movies
 *        contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movies'
 *      500:
 *        description: Some server error
 */

/**
 * @swagger
 * tags:
 *  name: Movies
 *  description: The Movies managing API
 * /api/movies/{id}:
 *    get:
 *      summary: Get data movies by id
 *      tags: [Movies]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movies'
 *    responses:
 *      200:
 *        description: The get movies
 *        contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movies'
 *      500:
 *        description: Some server error
 */

/**
 * @swagger
 * tags:
 *  name: Movies
 *  description: The Movies managing API
 * /api/movies:
 *    post:
 *      summary: Create new movies
 *      tags: [Movies]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movies'
 *    responses:
 *      200:
 *        description: The created movies
 *        contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movies'
 *      500:
 *        description: Some server error
 */

/**
 * @swagger
 * tags:
 *  name: Movies
 *  description: The Movies managing API
 * /api/movies/{id}:
 *    put:
 *      summary: Update movies by id
 *      tags: [Movies]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movies'
 *    responses:
 *      200:
 *        description: The update movies
 *        contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movies'
 *      500:
 *        description: Some server error
 */

/**
 * @swagger
 * tags:
 *  name: Movies
 *  description: The Movies managing API
 * /api/movies/{id}:
 *    delete:
 *      summary: Delete movies by id
 *      tags: [Movies]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movies'
 *    responses:
 *      200:
 *        description: The deleted movies
 *        contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movies'
 *      500:
 *        description: Some server error
 */

module.exports = router;
