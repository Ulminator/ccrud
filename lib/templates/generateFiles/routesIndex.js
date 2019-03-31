const fs = require('fs');

const { routesIndex } = require('../../paths');


function generateRoutesIndex(entities, cb) {
  const content = buildContent(entities);
  fs.writeFile(routesIndex, content, (err) => {
    if (err) cb(err);
  });
  cb(null);
}

function buildContent(entities) {
  return staticImports + dynamicImports(entities) + variableDeclaration + dynamicRoutes(entities) + staticRoutes;
}

const staticImports = `const { Router } = require('express');

`;

function dynamicImports(entities) {
  let output = '';
  Object.keys(entities).forEach(function(entity) {
    output += `const ${entity}Router = require('./${entity}Router');\n`
  });
  return output;
}

const variableDeclaration = `
const router = Router();

`;

function dynamicRoutes(entities) {
  let output = '';
  Object.keys(entities).forEach(function(entity) {
    output += `router.use('/${entity}', ${entity}Router);\n`
  });
  return output;
}

const staticRoutes = `
router.get('/health', (req, res) => {
  res.status(200).send({ status: 'UP' });
});

module.exports = router;

`;

module.exports = generateRoutesIndex;