let data = require("./secrets/save.bak.json");
const fs = require("fs");

for (let id in data.allQuests[1]) {
  let quest = data.allQuests[1][id];
  quest.likes = 0;
  quest.completed = 0;
  console.log(quest);
}



fs.writeFile("./secrets/save.json", JSON.stringify(data, null, 2), (err) => {
  if (err) {
    console.error("Error writing file:", err);
  } else {
    console.log("File written successfully");
  }
});
