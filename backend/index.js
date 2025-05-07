const { randomUUID } = require("crypto");
const https = require("https");
const cors = require("cors");
const express = require("express");
const config = require("./secrets/config.json");

const { auth, checkExists, shuffle } = require("./utils/misc.js");
const { app, startServer } = require("./utils/server.js");
let { state, Quest, questData, updateState, updateGame } = require("./utils/data.js");


/*
  *
  * GET    /quests                   - Get all quests in all seasons
  * POST   /like/:quest              - Like or dislike a quest
  * POST   /completed/:quest         - Complete or uncomplete a quest
  *
  * PUT    /admin/season/:season     - Create new season, overwrite if exists
  * PATCH  /admin/season/:season     - Set current season
  * DELETE /admin/season/:season     - Delete season
  *
  * PUT    /admin/quests/:season     - Completely overwrite all quests in existing season
  * POST   /admin/quests/:season     - Create or replace quests, keeping existing quests
  * DELETE /admin/quests/:season     - Delete quests by ID
  * GET    /admin/quests/:season     - Get all quests in season
  *
  * POST   /admin/game/update        - Update game
  * GET    /admin/quests             - Get all quests in all seasons
  * GET    /admin/seasons            - Get all seasons
  *
*/

app.get("/quests", (req, res) => {
  const { upcoming, ...cleanQuestData } = questData;
  cleanQuestData.season = state.season;
  cleanQuestData.seasonName = state.seasonName;

  res.json({ data: cleanQuestData });
});

app.post("/like/:quest", (req, res) => {
  const { quest } = req.params;
  const { change } = req.body;
  if (!checkExists(res, [quest, change])) return;
  if (!state.allQuests[state.season][quest]) return res.status(404).json({ data: "Not Found" });

  state.allQuests[state.season][quest].secrets.likes += Math.max(-2, Math.min(2, change));
  updateState();

  res.json({ data: "Success" });
});

app.post("/completed/:quest", (req, res) => {
  const { quest } = req.params;
  const { completed } = req.body;
  if (!checkExists(res, [quest, completed])) return;
  if (!state.allQuests[state.season][quest]) return res.status(404).json({ data: "Not Found" });

  state.allQuests[state.season][quest].secrets.finishes += completed ? 1 : -1;
  updateState();

  res.json({ data: "Success" });
});


app.put("/admin/season/:season", auth, (req, res) => {
  const { season } = req.params;
  const { quests, seasonName } = req.body;
  if (!checkExists(res, [season, seasonName])) return;

  state.seasons[season] = seasonName;
  state.allQuests[season] = {};
  if (quests) {
    shuffle(quests);
    for (const quest of quests) {
      quest.id = randomUUID();
      state.allQuests[season][quest.id] = new Quest(quest);
    }
  }
  updateState();

  res.json({ data: "Success" });
});

app.patch("/admin/season/:season", auth, (req, res) => {
  const { season } = req.params;
  if (!checkExists(res, [season])) return;
  if (!state.seasons[season]) return res.status(404).json({ data: "Not Found" });

  updateState(season);

  res.json({ data: "Success" });
});

app.delete("/admin/season/:season", auth, (req, res) => {
  const { season } = req.params;

  if (!checkExists(res, [season])) return;
  if (!state.seasons[season]) return res.status(404).json({ data: "Not Found" });
  if (season === state.season) return res.status(400).json({ data: "Cannot delete current season" });

  delete state.allQuests[season];
  delete state.seasons[season];

  res.json({ data: "Success" });
});



app.put("/admin/quests/:season", auth, (req, res) => {
  const { season } = req.params;
  const { quests } = req.body;
  if (!checkExists(res, [season, quests])) return;
  if (!state.seasons[season]) return res.status(404).json({ data: "Not Found" });

  state.allQuests[season] = {};
  shuffle(quests);
  for (const quest of quests) {
    quest.id = randomUUID();
    state.allQuests[season][quest.id] = new Quest(quest);
  }
  updateState();

  res.json({ data: "Success" });
});

app.post("/admin/quests/:season", auth, (req, res) => {
  const { season } = req.params;
  const { quests } = req.body;
  if (!checkExists(res, [season, quests])) return;
  if (!state.seasons[season]) return res.status(404).json({ data: "Not Found" });

  shuffle(quests);
  for (const quest of quests) {
    quest.id = randomUUID();
    state.allQuests[season][quest.id] = new Quest(quest);
  }
  updateState();

  res.json({ data: "Success" });
});

app.delete("/admin/quests/:season", auth, (req, res) => {
  const { season } = req.params;
  const { quests } = req.body;
  if (!checkExists(res, [season, quests])) return;
  if (!state.seasons[season]) return res.status(404).json({ data: "Not Found" });

  for (const quest of quests) delete state.allQuests[season][quest];
  updateState();

  res.json({ data: "Success" });
});

app.get("/admin/quests/:season", auth, (req, res) => {
  const { season } = req.params;
  if (!checkExists(res, [season])) return;
  if (!state.seasons[season]) return res.status(404).json({ data: "Not Found" });

  let data = {
    upcoming: {},
    current: {},
    previous: {}
  };
  for (const id in state.allQuests[season]) {
    const quest = state.allQuests[season][id];
    if (data[quest.status]) data[quest.status][id] = quest;
  }

  res.json({ data });
});

app.post("/admin/game/update", auth, (req, res) => {
  updateGame();
  res.json({ data: "Success" });
});

app.get("/admin/quests", auth, (req, res) => {
  const data = {};
  for (const season in state.allQuests) {
    data[season] = {
      upcoming: {},
      current: {},
      previous: {}
    };
    for (const id in state.allQuests[season]) {
      const quest = state.allQuests[season][id];
      if (data[season][quest.status]) data[season][quest.status][id] = quest;
    }
  }

  res.json({ data });
});

app.get("/admin/seasons", auth, (req, res) => {
  res.json({ data: state.seasons });
});


startServer();
