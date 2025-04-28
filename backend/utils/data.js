const { randomUUID } = require("crypto");
const fs = require("fs");
const path = require("path");
const config = require("../secrets/config.json");

const saveFile = path.join(__dirname, "../secrets", config.saveFile);
const saveFileExists = fs.existsSync(saveFile);

class Quest {
  constructor(data) {
    const { id, tag, description, status } = data || {};
    this.id = id || randomUUID();
    this.tag = tag || "Miscellaneous";
    this.description = description || "No description";
    this.status = status || "upcoming";
  }
}

let state = saveFileExists ? JSON.parse(fs.readFileSync(saveFile)) : {
  season: 0,
  seasons: [ "Placeholder" ],
  seasonName: "Placeholder",
  allQuests: [{}]
};

let questData = {};

function save() {
  const data = JSON.stringify(state, null, 2);
  fs.writeFile(saveFile, data, err => {
    if (err) console.error("Error saving state:", err);
  });
}

function updateState(season) {
  if (season) state.season = season;
  state.seasonName = state.seasons[state.season];

  // don't completely reassign the object, to prevent breaking references
  questData.upcoming = {};
  questData.current = {};
  questData.previous = {};

  for (const id in state.allQuests[state.season]) {
    const quest = state.allQuests[state.season][id];
    if (questData[quest.status]) questData[quest.status][id] = quest;
  }

  save();
}
updateState();

function updateGame() {
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

module.exports = { state, Quest, questData, updateState, updateGame };
