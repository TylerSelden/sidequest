const fs = require("fs");
const path = require("path");
const cron = require("node-cron");
const https = require("https");
const cors = require("cors");
const express = require("express");
const rateLimit = require("express-rate-limit");

const config = require("../secrets/config.json");
let { state, questData, updateState, updateGame } = require("./data.js");

const ssl = {
  cert: fs.readFileSync(path.join(__dirname, config.ssl.cert)),
  key: fs.readFileSync(path.join(__dirname, config.ssl.key))
}
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 60,
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

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
  cron.schedule("0 0 * * 1-6", updateGame);
  updateGame();

  https.createServer(ssl, app).listen(config.port, () => {
    console.log(`SideQuest REST API is running on port ${config.port}`);
  });
}


module.exports = { app, startServer };
