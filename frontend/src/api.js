const baseURL = "https://server.benti.dev:8443/sidequest";

async function request(method, url, body) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    }
  };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${baseURL}${url}`, options);
  const json = await res.json();

  if (!res.ok) throw new Error(json.data || "Request failed");
  return json.data;
}

const API = {
  local: {
    setQuestCompletion: (id, completed) => {
      let arr = JSON.parse(localStorage.getItem("sidequest") || "[]");
      arr.push(id);
      localStorage.setItem("sidequest", JSON.stringify(arr));
    },
    questsCompleted: JSON.parse(localStorage.getItem("sidequest") || "[]"),
    points: JSON.parse(localStorage.getItem("sidequest") || "[]").length * 10
  },

  remote: {
    getQuests: () => request("GET", "/quests"),
    putSeason: (key, season, quests, seasonName) => request("PUT", `/admin/quests/${season}`, { key, quests, seasonName }),
  },

  remoteMetadata: {
    getQuests: {
      type: "GET",
      url: "/quests",
      description: "Get all quests in the current season, excluding upcoming ones.",
      params: {}
    },
    putSeason: {
      type: "PUT",
      url: "/admin/season/{season}",
      description: "Create a new season (optionally with quests), overwriting it if it already exists.",
      params: {
        "Key": {
          type: "string",
          description: "Your admin API key",
          required: true
        },
        "Quests": {
          type: "array",
          description: "An array of quests to be added to the season",
          required: false
        },
        "Season Name": {
          type: "string",
          description: "The name of the season",
          required: true
        }
      }
    }
  }
}


export default API;
