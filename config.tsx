const dotenv = require("dotenv");
const _ = require("lodash");

const result = dotenv.config();

let envs;

if (!("error" in result)) {
  //If error, assume there isn't .env file
  envs = result.parsed;
} else {
  // fallback to check process.env
  envs = {};
  _.each(process.env, (value, key) => (envs[key] = value));
}

module.exports = envs;
