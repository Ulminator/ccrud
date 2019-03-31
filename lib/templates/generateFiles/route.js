const fs = require('fs');

const { routes } = require('../../paths');

const staticImports = `const { Router } = require('express');\n\n`;

function variableDeclaration(entity) {
  return `const ${entity}Router = Router();\n\n`;
}

function exportLine(entity) {
  return `module.exports = ${entity}Router;\n`;
}

function dynamicImports(entity) {
  return `const ${entity}Controller = require('../controllers/${entity}Controller');\n\n`;
}

function create(entity) {
  return `${entity}Router.post('/', (req, res) => ${entity}Controller.create(req, res));\n\n`;
}

function read(entity) {
  let output = `${entity}Router.get('/', (req, res) => ${entity}Controller.getAll(req, res));\n\n`;
  output += `${entity}Router.get('/:id', (req, res) => ${entity}Controller.getById(req, res));\n\n`;
  return output;
}

function update(entity) {
  let output = `${entity}Router.put('/:id', (req, res) => ${entity}Controller.put(req, res));\n\n`;
  output += `${entity}Router.patch('/:id', (req, res) => ${entity}Controller.patch(req, res));\n\n`;
  return output;
}

function erase(entity) {
  let output = `${entity}Router.delete('/', (req, res) => ${entity}Controller.deleteAll(req, res));\n\n`;
  output += `${entity}Router.delete('/:id', (req, res) => ${entity}Controller.deleteById(req, res));\n\n`;
  return output;
}

function dynamicRoutes(entity) {
  return create(entity) + read(entity) + update(entity) + erase(entity);
}

function buildContent(entity) {
  return staticImports + dynamicImports(entity) + variableDeclaration(entity) + dynamicRoutes(entity) + exportLine(entity);
}

function generateRoute(entity, cb) {
  const content = buildContent(entity);
  fs.writeFile(`${routes}/${entity}Router.js`, content, (err) => {
    if (err) cb(err);
  });
  cb(null);
}

module.exports = generateRoute;
