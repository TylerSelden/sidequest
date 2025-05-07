const data = require("./secrets/backup.json");
const fs = require("fs");

for (const id in data.allQuests[1]) {
  const quest = data.allQuests[1][id];
  quest.secrets = {
    likes: quest.likes,
    finishes: quest.completed
  }
  delete quest.likes;
  delete quest.completed;
}

fs.writeFileSync("./secrets/save.json", JSON.stringify(data, null, 2));
