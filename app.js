const express = require("express");
const app = express();
const port = 3000;
const db = require("./config/db");
const routerMovie = require("./routes/routeMovies");
const routerUsers = require("./routes/routeUsers");
const routerAuth = require("./routes/routeAuth");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = require("./docApi/docApi");

const specs = swaggerJsdoc(options);
app.use("/swagger-docs-api", swaggerUi.serve, swaggerUi.setup(specs));

app.use(morgan("tiny"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/movies", routerMovie);
app.use("/api/users", routerUsers);
app.use("/api/auth", routerAuth);

db.connect((err) => {
  return err ? console.log(err) : console.log(`database connected`);
});

app.listen(port, () => {
  console.log(`server runnning on http://localhost:${port}`);
});
