const fs = require('fs');

const routesPath = `${process.cwd()}/src/routes`;

function generateRoutes(cb) {
  fs.mkdir(routesPath, (err) => {
    if (err) cb(err);
    cb(null);
  });
}

module.exports = generateRoutes;
