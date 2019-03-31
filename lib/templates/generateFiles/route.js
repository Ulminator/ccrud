const fs = require('fs');

const { routes } = require('../../paths');

function generateRoute(entity, cb) {
  const content = buildContent(entity);
  fs.writeFile(`${routes}/${entity}Router.js`, content, (err) => {
    if (err) cb(err);
  });
  cb(null);
}

function buildContent(entity) {
  return staticImports + dynamicImports(entity) + variableDeclaration(entity) + dynamicRoutes(entity) + exportLine(entity);
}

const staticImports = `const { Router } = require('express');\n\n`;

function dynamicImports(entity) {
  return `const ${entity}Controller = require('../controllers/${entity}Controller');\n\n`;
}

function variableDeclaration(entity) {
  return `const ${entity}Router = Router();\n`;
}

function dynamicRoutes(entity) {
  return create(entity) + read(entity) + update(entity) + erase(entity);
}


function create(entity) {
  return `
${entity}Router.post('/', (req, res) => ${entity}Controller.create(req, res));
`;
}

function read(entity) {
  return `
${entity}Router.get('/', (req, res) => {
  if (Object.keys(req.query).length > 0) return ${entity}Controller.getByPrimaryKey(req, res);
  else return ${entity}Controller.getAll(req, res);
});
`;
}

function update(entity) {
  return `
${entity}Router.put('/:id', (req, res) => ${entity}Controller.put(req, res));

${entity}Router.patch('/:id', (req, res) => ${entity}Controller.patch(req, res));
`;
}

function erase(entity) {
  return `
${entity}Router.delete('/', (req, res) => ${entity}Controller.deleteAll(req, res));

${entity}Router.delete('/:id', (req, res) => ${entity}Controller.deleteById(req, res));
`;
}

function exportLine(entity) {
  return `module.exports = ${entity}Router;\n`;
}

module.exports = generateRoute;
