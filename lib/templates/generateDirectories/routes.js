const fs = require('fs');

const { routes } = require('../../paths');

function generateRoutes(cb) {
  fs.mkdir(routes, (err) => {
    if (err) cb(err);
    cb(null);
  });
}

module.exports = generateRoutes;
