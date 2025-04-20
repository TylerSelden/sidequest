const baseURL = "https://server.benti.dev:8443/sidequest";

async function request(method, url, body) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    }
  }
  if (body) {
    body = JSON.stringify(body);
    if (method === "GET") {
      // add body as URL params
      url += `?data=${encodeURIComponent(body)}`;
    } else {
      options.body = body;
    }
  }


  const res = await fetch(`${baseURL}${url}`, options);

  let text = await res.text();
  try {
    text = JSON.parse(text).data;
  } catch {
    alert("Error parsing API response");
  }

  return text;
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
    getQuests:            () => request("GET", "/quests"),

    putSeason:            (key, season, quests, seasonName) => request("PUT", `/admin/season/${season}`, { key, quests, seasonName }),
    patchSeason:          (key, season) => request("PATCH", `/admin/season/${season}`, { key }),
    deleteSeason:         (key, season) => request("DELETE", `/admin/season/${season}`, { key }),

    putQuests:            (key, season, quests) => request("PUT", `/admin/quests/${season}`, { key, quests }),
    postQuests:           (key, season, quests) => request("POST", `/admin/quests/${season}`, { key, quests }),
    deleteQuests:         (key, season, quests) => request("DELETE", `/admin/quests/${season}`, { key, quests }),
    adminGetQuestsSeason: (key, season) => request("GET", `/admin/quests/${season}`, { key }),
    adminGetQuests:       (key) => request("GET", "/admin/quests", { key }),
    getSeasons:           (key) => request("GET", "/admin/seasons", { key }),
  },

  // params must be listed in order of appearance in their respective functions

  remoteMetadata: {
    getQuests: {
      type: "GET",
      url: "/quests",
      description: "Get all quests in the current season, excluding upcoming ones",
      params: {}
    },

    putSeason: {
      type: "PUT",
      url: "/admin/season/{season}",
      description: "Create a new season (optionally with quests), overwriting it if it already exists",
      params: {
        "Key": {
          formal: "key",
          type: "password",
          description: "Your admin API key",
          required: true
        },
        "Season": {
          formal: "season",
          type: "number",
          description: "The season number",
          required: true
        },
        "Quests": {
          formal: "quests",
          type: "json",
          description: "An array of quests to be added to the season",
          required: false
        },
        "Season Name": {
          formal: "seasonName",
          type: "string",
          description: "The name of the season",
          required: true
        }
      }
    },
    patchSeason: {
      type: "PATCH",
      url: "/admin/season/{season}",
      description: "Change the current season number",
      params: {
        "Key": {
          formal: "key",
          type: "password",
          description: "Your admin API key",
          required: true
        },
        "Season": {
          formal: "season",
          type: "number",
          description: "The new season number",
          required: true
        }
      }
    },
    deleteSeason: {
      type: "DELETE",
      url: "/admin/season/{season}",
      description: "Delete a season",
      params: {
        "Key": {
          formal: "key",
          type: "password",
          description: "Your admin API key",
          required: true
        },
        "Season": {
          formal: "season",
          type: "number",
          description: "The season number",
          required: true
        }
      }
    },

    putQuests: {
      type: "PUT",
      url: "/admin/quests/{season}",
      description: "Completely overwrite all quests in a season",
      params: {
        "Key": {
          formal: "key",
          type: "password",
          description: "Your admin API key",
          required: true
        },
        "Season": {
          formal: "season",
          type: "number",
          description: "The season number",
          required: true
        },
        "Quests": {
          formal: "quests",
          type: "json",
          description: "An array of quests to be added to the season",
          required: true
        }
      }
    },
    postQuests: {
      type: "POST",
      url: "/admin/quests/{season}",
      description: "Add or modify quests in a season, without overwriting existing ones",
      params: {
        "Key": {
          formal: "key",
          type: "password",
          description: "Your admin API key",
          required: true
        },
        "Season": {
          formal: "season",
          type: "number",
          description: "The season number",
          required: true
        },
        "Quests": {
          formal: "quests",
          type: "json",
          description: "An array of quests to be added to the season",
          required: true
        }
      }
    },
    deleteQuests: {
      type: "DELETE",
      url: "/admin/quests/{season}",
      description: "Delete quests from a season by ID",
      params: {
        "Key": {
          formal: "key",
          type: "password",
          description: "Your admin API key",
          required: true
        },
        "Season": {
          formal: "season",
          type: "number",
          description: "The season number",
          required: true
        },
        "Quests": {
          formal: "quests",
          type: "json",
          description: "An array of quest IDs to be deleted from the season",
          required: true
        }
      }
    },
    adminGetQuestsSeason: {
      type: "GET",
      url: "/admin/quests/{season}",
      description: "Get all quests in a specific season, including upcoming ones",
      params: {
        "Key": {
          formal: "key",
          type: "password",
          description: "Your admin API key",
          required: true
        },
        "Season": {
          formal: "season",
          type: "number",
          description: "The season number",
          required: true
        }
      }
    },
    adminGetQuests: {
      type: "GET",
      url: "/admin/quests",
      description: "Get all quests in all seasons, including upcoming ones",
      params: {
        "Key": {
          formal: "key",
          type: "password",
          description: "Your admin API key",
          required: true
        }
      }
    },
    getSeasons: {
      type: "GET",
      url: "/admin/seasons",
      description: "Get a list of all seasons",
      params: {
        "Key": {
          formal: "key",
          type: "password",
          description: "Your admin API key",
          required: true
        }
      }
    }
  }
}


export default API;
