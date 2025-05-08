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
    ver: 2,
    upgrade: [
      null,
      () => {
        const completed = API.local.get();
        localStorage.setItem("sidequest", API.local.defaultValue);
        API.local.set("completed", completed);
      },
      () => {
        API.local.set("likes", {});
      }
    ],
    get: (key) => {
      const val = JSON.parse(localStorage.getItem("sidequest") || API.local.defaultValue);
      if (key) return val[key];
      return val;
    },
    set: (key, val) => {
      let obj = API.local.get();
      obj[key] = val;
      localStorage.setItem("sidequest", JSON.stringify(obj));
    },
    setQuestCompletion: (id, completed) => {
      let arr = API.local.get("completed");
      if (completed) {
        arr.push(id);
      } else {
        arr = arr.filter((questId) => questId !== id);
      }
      API.local.set("completed", arr);
    },
    setAdminKey: (key) => API.local.set("adminKey", key),

    setLike: (key, val) => {
      let likes = API.local.get("likes");
      likes[key] = val;
      API.local.set("likes", likes);
    },
    removeLike: (key) => {
      let likes = API.local.get("likes");
      delete likes[key];
      API.local.set("likes", likes);
    },

    initialize: () => {
      API.local.defaultValue = JSON.stringify({
        ver: API.local.ver,
        completed: [],
        adminKey: "",
        likes: {}
      });

      const currentVer = API.local.get("ver") || 0;
      for (let i = currentVer + 1; i <= API.local.ver; i++) API.local.upgrade[i]();
      API.local.set("ver", API.local.ver);

      const val = API.local.get();
      API.local.questsCompleted = val.completed;
      API.local.adminKey = val.adminKey;
      API.local.likes = val.likes;
    }
  },

  remote: {
    getQuests:            () => request("GET", "/quests"),
    postLike:             (quest, change) => request("POST", `/like/${quest}`, { change }),
    postCompleted:        (quest, completed) => request("POST", `/completed/${quest}`, { completed }),

    putSeason:            (key, season, quests, seasonName) => request("PUT", `/admin/season/${season}`, { key, quests, seasonName }),
    patchSeason:          (key, season) => request("PATCH", `/admin/season/${season}`, { key }),
    deleteSeason:         (key, season) => request("DELETE", `/admin/season/${season}`, { key }),

    putQuests:            (key, season, quests) => request("PUT", `/admin/quests/${season}`, { key, quests }),
    postQuests:           (key, season, quests) => request("POST", `/admin/quests/${season}`, { key, quests }),
    deleteQuests:         (key, season, quests) => request("DELETE", `/admin/quests/${season}`, { key, quests }),
    adminGetQuestsSeason: (key, season) => request("GET", `/admin/quests/${season}`, { key }),
    adminUpdateGame:      (key, season) => request("POST", `/admin/game/update`, { key }),
    adminGetQuests:       (key) => request("GET", "/admin/quests", { key }),
    getSeasons:           (key) => request("GET", "/admin/seasons", { key }),
  },

  // params must be listed in order of appearance in their respective functions

  remoteMetadata: {
    getQuests: {
      type: "GET",
      url: "/quests",
      privileged: false,
      description: "Get all quests in the current season, excluding upcoming ones",
      params: {}
    },
    postLike: {
      type: "POST",
      url: "/like/{quest}",
      privileged: false,
      description: "Like or unlike a quest",
      params: {
        "Quest": {
          formal: "quest",
          type: "string",
          description: "The quest ID",
          required: true
        },
        "Change": {
          formal: "change",
          type: "number",
          description: "How much the like count should change",
          required: true
        }
      }
    },
    postCompleted: {
      type: "POST",
      url: "/completed/{quest}",
      privileged: false,
      description: "Mark a quest as completed or not completed",
      params: {
        "Quest": {
          formal: "quest",
          type: "string",
          description: "The quest ID",
          required: true
        },
        "Completed": {
          formal: "completed",
          type: "boolean",
          description: "Whether or not the quest is completed",
          required: true
        }
      }
    },

    putSeason: {
      type: "PUT",
      url: "/admin/season/{season}",
      privileged: true,
      description: "Create a new season (optionally with quests), overwriting it if it already exists",
      params: {
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
      privileged: true,
      description: "Change the current season number",
      params: {
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
      privileged: true,
      description: "Delete a season",
      params: {
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
      privileged: true,
      description: "Completely overwrite all quests in a season",
      params: {
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
      privileged: true,
      description: "Add or modify quests in a season, without overwriting existing ones",
      params: {
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
      privileged: true,
      description: "Delete quests from a season by ID",
      params: {
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
      privileged: true,
      description: "Get all quests in a specific season, including upcoming ones",
      params: {
        "Season": {
          formal: "season",
          type: "number",
          description: "The season number",
          required: true
        }
      }
    },
    adminUpdateGame: {
      type: "POST",
      url: "/admin/game/update",
      privileged: true,
      description: "Run the game's update script early.",
      params: {}
    },
    adminGetQuests: {
      type: "GET",
      url: "/admin/quests",
      privileged: true,
      description: "Get all quests in all seasons, including upcoming ones",
      params: {}
    },
    getSeasons: {
      type: "GET",
      url: "/admin/seasons",
      privileged: true,
      description: "Get a list of all seasons",
      params: {}
    }
  }
}


export default API;
