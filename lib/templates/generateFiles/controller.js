const fs = require('fs');

const { controllers } = require('../../paths');

function exportLine(entity) {
  return `
module.exports = {
  create,
  getAll,
  getById,
  put,
  patch,
  deleteAll,
  deleteById
}\n`;
}

function create(entity) {
  return `
function create(req, res) {
  res.status(200).send('create');
}
`;
}

function read(entity) {
  return `
function getAll(req, res) {
  res.status(200).send('getAll');
}

function getById(req, res) {
  res.status(200).send('getById');
}
`;
}

function update(entity) {
  return `
function put(req, res) {
  res.status(200).send('put');
}

function patch(req, res) {
  res.status(200).send('patch');
}
`;
}

function erase(entity) {
  return `
function deleteAll(req, res) {
  res.status(200).send('deleteAll');
}

function deleteById(req, res) {
  res.status(200).send('deleteById');
}
`;
}

function dynamicRoutes(entity) {
  return create(entity) + read(entity) + update(entity) + erase(entity);
}

function buildContent(entity) {
  return dynamicRoutes(entity) + exportLine(entity);
}

function generateController(entity, cb) {
  const content = buildContent(entity);
  fs.writeFile(`${controllers}/${entity}Controller.js`, content, (err) => {
    if (err) cb(err);
  });
  cb(null);
}

module.exports = generateController;
