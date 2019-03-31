const fs = require('fs');

const { database } = require('../../paths');

function generateDatabase(cb) {
  fs.mkdir(database, (err) => {
    if (err) cb(err);
    cb(null);
  });
}

module.exports = generateDatabase;
