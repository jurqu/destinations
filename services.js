const { UIDs } = require("./db");

function generateUID() {
  let uid = "";
  //generate a 10 digit id that is unique
  for (let index = 0; index < 10; index++) {
    const rand = Math.floor(Math.random() * 10);
    uid += rand;
  }
  return uid;
}

function validateUID() {
  let id = generateUID();

  while (UIDs[id]) {
    id = generateUID;
  }
  UIDS[id] = true;

  return id;
}
exports.generateUID = validateUID;
