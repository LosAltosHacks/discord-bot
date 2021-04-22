const fileName = "./users.json"
const users = require(fileName);
const fs = require('fs');

users.d = "new value";

fs.writeFile(fileName, JSON.stringify(users), function callback(err) {})