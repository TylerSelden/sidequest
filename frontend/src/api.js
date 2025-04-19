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
    getQuests: () => request("GET", "/quests")
  },

  remoteParams: {
    getQuests: {
      type: "GET",
      url: "/quests",
      description: "Get all quests in the current season, excluding upcoming ones.",
      params: ["Test", "Data", "More"],
      paramTypes: ["number", "json", "text"],
      paramDefaults: [0, "{}", "This is a test"],
      paramRequired: [true, false, true]
    }
  }
}


export default API;
