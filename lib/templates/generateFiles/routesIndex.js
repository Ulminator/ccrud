const fs = require('fs');

const { routesIndex } = require('../../paths');

const staticImports = `const { Router } = require('express');

`;

const variableDeclaration = `
const router = Router();

`;

const staticRoutes = `
router.get('/health', (req, res) => {
  res.status(200).send({ status: 'UP' });
});

module.exports = router;

`;

function dynamicImports(entities) {
  let output = '';
  Object.keys(entities).forEach(function(entity) {
    output += `const ${entity}Router = require('./${entity}Router');\n`
  });
  return output;
}

function dynamicRoutes(entities) {
  let output = '';
  Object.keys(entities).forEach(function(entity) {
    output += `router.use('/${entity}', ${entity}Routes);\n`
  });
  return output;
}

function buildContent(entities) {
  return staticImports + dynamicImports(entities) + variableDeclaration + dynamicRoutes(entities) + staticRoutes;
}

function generateRoutesIndex(entities, cb) {
  const content = buildContent(entities);
  fs.writeFile(routesIndex, content, (err) => {
    if (err) cb(err);
  });
  cb(null);
}

module.exports = generateRoutesIndex;