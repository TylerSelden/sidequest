const fs = require("fs");
const path = require("path");
const https = require("https");
const cron = require("node-cron");
const cors = require("cors");
const express = require("express");
const config = require("./secrets/config.json");

const { auth, checkExists, uuid } = require("./utils/misc.js");
const { app, startServer } = require("./utils/server.js");
let { currentSeason, seasons, Quest, allQuests, questData, updateQuestData } = require("./utils/data.js");


/*
  *
  * GET    /quests                   - Get all quests in all seasons

  * PUT    /admin/season/:season     - Create new season, overwrite if exists
  * PATCH  /admin/season/:season     - Set current season
  * DELETE /admin/season/:season     - Delete season

  * PUT    /admin/quests/:season     - Completely overwrite all quests in existing season
  * POST   /admin/quests/:season     - Create or replace quests, keeping existing quests
  * DELETE /admin/quests/:season/:id - Delete a single quest
  * GET    /admin/quests/:season     - Get all quests in season
  * GET    /admin/quests             - Get all quests in all seasons
  *
*/

app.get("/quests", (req, res) => {
  const { upcoming, ...cleanQuestData } = questData;
  cleanQuestData.season = currentSeason;
  cleanQuestData.seasonName = seasons[currentSeason];

  res.json({ data: cleanQuestData });
});



app.put("/admin/season/:season", auth, (req, res) => {
  const { season } = req.params;
  const { quests, seasonName } = req.body;
  if (!checkExists(res, [season, seasonName])) return;

  seasons[season] = seasonName;
  allQuests[season] = {};
  if (quests) {
    for (const quest of quests) {
      quest.id = uuid();
      allQuests[season][quest.id] = new Quest(quest);
    }
  }
  updateQuestData();

  res.json({ data: "Success" });
});

app.patch("/admin/season/:season", auth, (req, res) => {
  const { season } = req.params;
  if (!checkExists(res, [season])) return;
  if (!allQuests[season]) return res.status(404).json({ data: "Not Found" });

  currentSeason = season;
  updateQuestData();

  res.json({ data: "Success" });
});

app.delete("/admin/season/:season", auth, (req, res) => {
  const { season } = req.params;

  if (!checkExists(res, [season])) return;
  if (!seasons[season]) return res.status(404).json({ data: "Not Found" });
  if (season === currentSeason) return res.status(400).json({ data: "Cannot delete current season" });

  delete allQuests[season];
  delete seasons[season];

  res.json({ data: "Success" });
});



app.put("/admin/quests/:season", auth, (req, res) => {
  const { season } = req.params;
  const { quests } = req.body;
  if (!checkExists(res, [season, quests])) return;
  if (!allQuests[season]) return res.status(404).json({ data: "Not Found" });

  allQuests[season] = {};
  for (const quest of quests) {
    quest.id = uuid();
    allQuests[season][quest.id] = new Quest(quest);
  }
  updateQuestData();

  res.json({ data: "Success" });
});

app.post("/admin/quests/:season", auth, (req, res) => {
  const { season } = req.params;
  const { quests } = req.body;
  if (!checkExists(res, [season, quests])) return;

  if (!allQuests[season]) return res.status(404).json({ data: "Not Found" });
  for (const quest of quests) {
    quest.id = uuid();
    allQuests[season][quest.id] = new Quest(quest);
  }
  updateQuestData();

  res.json({ data: "Success" });
});

app.delete("/admin/quests/:season/:id", auth, (req, res) => {
  const { season, id } = req.params;
  if (!checkExists(res, [season, id])) return;
  if (!allQuests[season] || !allQuests[season][id]) return res.status(404).json({ data: "Not Found" });

  delete allQuests[season][id];
  updateQuestData();

  res.json({ data: "Success" });
});

app.get("/admin/quests/:season", auth, (req, res) => {
  const { season } = req.params;
  if (!checkExists(res, [season])) return;
  if (!allQuests[season]) return res.status(404).json({ data: "Not Found" });

  let data = {
    upcoming: {},
    current: {},
    previous: {}
  };
  for (const id in allQuests[season]) {
    const quest = allQuests[season][id];
    if (data[quest.status]) data[quest.status][id] = quest;
  }

  res.json({ data });
});

app.get("/admin/quests", auth, (req, res) => {
  const data = {};
  for (const season in allQuests) {
    data[season] = {
      upcoming: {},
      current: {},
      previous: {}
    };
    for (const id in allQuests[season]) {
      const quest = allQuests[season][id];
      if (data[season][quest.status]) data[season][quest.status][id] = quest;
    }
  }

  res.json({ data });
});


startServer();
