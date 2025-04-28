const fs = require("fs");
const path = require("path");
const cron = require("node-cron");
const https = require("https");
const cors = require("cors");
const express = require("express");
const rateLimit = require("express-rate-limit");

const config = require("../secrets/config.json");
let { state, questData, updateState } = require("./data.js");

const ssl = {
  cert: fs.readFileSync(path.join(__dirname, config.ssl.cert)),
  key: fs.readFileSync(path.join(__dirname, config.ssl.key))
}
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false
});
////app.use(limiter);

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

function update() {
  // atttempt to move up a season if out of quests
  if (Object.keys(questData.upcoming).length < 1 && state.seasons[state.season + 1]) updateState(state.season + 1);

  // choose max of 3 quests from upcoming to current
  const upcomingQuests = Object.keys(questData.upcoming);
  const size = Math.min(3, upcomingQuests.length);
  for (let i = 0; i < size; i++) {
    const index = Math.floor(Math.random() * upcomingQuests.length);
    const id = upcomingQuests[index];
    state.allQuests[state.season][id].status = "current";
    upcomingQuests.splice(index, 1);
  }

  // move current quests to previous
  for (const id in questData.current) state.allQuests[state.season][id].status = "previous";

  updateState();
}

function startServer() {
  cron.schedule("0 0 * * 1-6", update);
  update();

  https.createServer(ssl, app).listen(config.port, () => {
    console.log(`SideQuest REST API is running on port ${config.port}`);
  });
}


module.exports = { app, startServer };
