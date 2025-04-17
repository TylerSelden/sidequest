const fs = require("fs");
const path = require("path");
const https = require("https");
const cors = require("cors");
const express = require("express");
const config = require("../secrets/config.json");

const ssl = {
  cert: fs.readFileSync(path.join(__dirname, config.ssl.cert)),
  key: fs.readFileSync(path.join(__dirname, config.ssl.key))
}
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
// middleware function for all get requests

app.use((req, res, next) => {
  if (req.method === "GET" && req.query.data) {
    req.data = JSON.parse(req.query.data);
  } else if (req.body) {
    req.data = req.body;
  }
  next();
});

app.param("season", (req, res, next) => {
  req.params.season = parseInt(req.params.season);
  next();
});

function startServer() {
  https.createServer(ssl, app).listen(config.port, () => {
    console.log(`SideQuest REST API is running on port ${config.port}`);
  });
}


module.exports = { app, startServer };
