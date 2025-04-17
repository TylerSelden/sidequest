const { uuid } = require("./misc.js");

let currentSeason = 0;

let seasons = [
  "Season 0 :D"
];

class Quest {
  constructor(data) {
    const { id, tag, description, status } = data || {};
    this.id = id || uuid();
    this.tag = tag || "Miscellaneous";
    this.description = description || "No description";
    this.status = status || "upcoming";
  }
}

let allQuests = [{}];
let questData = {};

function updateQuestData() {
  // don't completely reassign the object, to prevent breaking references
  questData.upcoming = {};
  questData.current = {};
  questData.previous = {};

  for (const id in allQuests[currentSeason]) {
    const quest = allQuests[currentSeason][id];
    if (questData[quest.status]) questData[quest.status][id] = quest;
  }
}
updateQuestData();

module.exports = { currentSeason, seasons, Quest, allQuests, questData, updateQuestData };
