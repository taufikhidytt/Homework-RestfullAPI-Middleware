const express = require("express");
const app = express();
const port = 3000;
const db = require("./config/db");
const routerMovie = require("./routes/routeMovies");
const routerUsers = require("./routes/routeUsers");

app.use("/api/movies", routerMovie);
app.use("/api/users", routerUsers);

db.connect((err) => {
  return err ? console.log(err) : console.log(`database connected`);
});

app.listen(port, () => {
  console.log(`server runnning on http://localhost:${port}`);
});
