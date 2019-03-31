const generateSrc = require('./generateDirectories/src');
const generateIndex = require('./generateFiles/index');
const generateRoutes = require('./generateDirectories/routes');
const generateRoutesIndex = require('./generateFiles/routesIndex');
const generateRoute = require('./generateFiles/route');
const generateControllers = require('./generateDirectories/controllers');
const generateController = require('./generateFiles/controller');
const generateDatabase = require('./generateDirectories/database');
const generateExecute = require('./generateFiles/execute');
const paths = require('../paths');

const entities = require('../../entities.json');

function generateTemplate() {
  generateSrc((err) => {
    console.log(paths.src);
    if (err) console.error(err);
    else {
      generateIndex((err) => {
        if (err) console.error(err);
        else console.log(paths.index);
      });

      generateRoutes((err) => {
        if (err) console.error(err);
        else {
          console.log(paths.routes);
          generateRoutesIndex(entities, (err) => {
            if (err) console.error(err);
            else console.log(paths.routesIndex);
          });

          Object.keys(entities).forEach(function(entity) {
            generateRoute(entity, (err) => {
              if (err) console.error(err);
              else console.log(`${paths.routes}/${entity}Router.js`);
            });
          });
        }
      });

      generateControllers((err) => {
        if (err) console.log(err);
        else {
          console.log(paths.controllers);
          Object.keys(entities).forEach(function(entityName) {
            const entity = entities[entityName];
            generateController(entityName, entity, (err) => {
              if (err) console.error(err);
              else console.log(`${paths.controllers}/${entityName}Controller.js`);
            });
          });
        }
      });

      generateDatabase((err) => {
        if (err) console.error(err);
        else {
          console.log(paths.database);
          generateExecute((err) => {
            if (err) console.error(err);
            else console.log(`${paths.execute}`);
          });
        }
      });
    }
  });
};

module.exports = generateTemplate;
