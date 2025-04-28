const { uuid } = require("./misc.js");

class Quest {
  constructor(data) {
    const { id, tag, description, status } = data || {};
    this.id = id || uuid();
    this.tag = tag || "Miscellaneous";
    this.description = description || "No description";
    this.status = status || "upcoming";
  }
}

let state = {
  season: 0,
  seasons: [ "Placeholder" ],
  seasonName: "Placeholder",
  allQuests: [{}]
};

let questData = {};

function updateState(season) {
  if (season) state.season = season;
  state.seasonName = state.seasons[season];

  // don't completely reassign the object, to prevent breaking references
  questData.upcoming = {};
  questData.current = {};
  questData.previous = {};

  for (const id in state.allQuests[state.season]) {
    const quest = state.allQuests[state.season][id];
    if (questData[quest.status]) questData[quest.status][id] = quest;
  }
}
updateState();

module.exports = { state, Quest, questData, updateState };
