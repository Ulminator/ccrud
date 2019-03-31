const generateSrc = require('./generateDirectories/src');
const generateIndex = require('./generateFiles/index');
const generateRoutes = require('./generateDirectories/routes');
const generateRoutesIndex = require('./generateFiles/routesIndex');
const generateRoute = require('./generateFiles/route');
const generateControllers = require('./generateDirectories/controllers');
const generateController = require('./generateFiles/controller');
const paths = require('../paths');

const entities = require('../../entities.json');

function generateTemplate() {
  generateSrc((err) => {
    console.log(paths.src)
    if (err) console.log(err);
    else {
      generateIndex((err) => {
        if (err) console.log(err);
        else console.log(paths.index);
      });

      generateRoutes((err) => {
        if (err) console.log(err);
        else {
          console.log(paths.routes);
          generateRoutesIndex(entities, (err) => {
            if (err) console.log(err);
            console.log(paths.routesIndex);
          });

          Object.keys(entities).forEach(function(entity) {
            generateRoute(entity, (err) => {
              if (err) console.log(err);
              console.log(`${paths.routes}/${entity}Router.js`)
            });
          });
        }
      });

      generateControllers((err) => {
        if (err) console.log(err);
        else {
          console.log(paths.controllers);
          Object.keys(entities).forEach(function(entity) {
            generateController(entity, (err) => {
              if (err) console.log(err);
              console.log(`${paths.controllers}/${entity}Controller.js`)
            });
          });
        }
      });
    }
  });
};

module.exports = generateTemplate;
