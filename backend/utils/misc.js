const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");
const config = require("../secrets/config.json");
const { saveFile, state } = require("./data.js");

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


module.exports = { auth, checkExists };
