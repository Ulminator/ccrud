const fs = require('fs');

const { controllers } = require('../../paths');

function generateControllers(cb) {
  fs.mkdir(controllers, (err) => {
    if (err) cb(err);
    cb(null);
  });
}

module.exports = generateControllers;
