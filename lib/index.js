#!/usr/bin/env node
const fs = require('fs');

// Make a custom entry point for the config file.
// npm i commander
if (fs.existsSync('./entities.json')) {
  require('./templates/index')();
} else {
  throw new Error("You must have a config file.");
}
