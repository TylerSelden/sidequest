const { createHash, randomUUID } = require("crypto");
const config = require("../secrets/config.json");

function auth(req, res, next) {
  if (req.data.key !== config.adminKey) return res.status(401).json({ data: "Unauthorized" });
  next();
}

function checkExists(res, data) {
  let allExists = !data.some(i => i === undefined);
  if (!allExists) {
    res.status(400).json({ data: "Bad Request" });
    return false;
  }
  return true;
}

function uuid() {
  return randomUUID();
}


module.exports = { auth, checkExists, uuid };
