const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");
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

function shuffle(arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    var j = i + Math.floor(Math.random() * (arr.length - i));

    var temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}


module.exports = { auth, checkExists, shuffle };
