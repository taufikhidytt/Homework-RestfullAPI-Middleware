const express = require("express");
const port = 3000;
const app = express();

const server = app.listen(port, () => {
  console.log(`server runnning on http://localhost:${port}`);
});

module.exports = server;
