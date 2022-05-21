const chokidar = require("chokidar");
const fs = require("fs");
const Mock = require("mockjs");

let db = {};

const watcher = chokidar.watch("./database/*.json");

watcher.on("all", (event, path) => {
  const cur_db = Mock.mock(JSON.parse(fs.readFileSync("./" + path, "utf8")));
  const prefix = path.replace("database/", "").replace(".json", "");

  // filename
  db[prefix] = cur_db;
  console.log(db[prefix]);

  for (let key in cur_db) {
    db[`${prefix}@${key}`] = cur_db[key];
  }

  fs.writeFileSync("./db.json", JSON.stringify(db));
});
