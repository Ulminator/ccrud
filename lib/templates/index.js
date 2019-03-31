const generateSrc = require('./generateDirectories/src');
const generateIndex = require('./generateFiles/index');
const generateRoutes = require('./generateDirectories/routes');
const generateRoutesIndex = require('./generateFiles/routesIndex');

function generateTemplate() {
  generateSrc((err) => {
    console.log('src/')
    if (err) console.log(err);
    else {
      generateIndex((err) => {
        if (err) console.log(err);
        else console.log('src/index.js');
      });

      generateRoutes((err) => {
        if (err) console.log(err);
        else {
          console.log('src/routes');
          generateRoutesIndex((err) => {
            if (err) console.log(err);
            console.log('src/routes/index.js');
          });
        }
      });
    }
  });
};

module.exports = generateTemplate;
