const fs = require('fs');

const { controllers } = require('../../paths');

const insert = require('../sql/insert');
const getAll = require('../sql/getAll');
const getByPrimaryKey = require('../sql/getByPrimaryKey');

function generateController(name, entity, cb) {
  const content = buildContent(entity);
  fs.writeFile(`${controllers}/${name}Controller.js`, content, (err) => {
    if (err) cb(err);
  });
  cb(null);
}

function buildContent(entity) {
  return staticImports + dynamicRoutes(entity) + exportLine(entity);
}

const staticImports = `const execute = require('../database/execute');\n`;

function dynamicRoutes(entity) {
  return create(entity) + read(entity) + update(entity) + erase(entity);
}

function create(entity) {
  return `
async function create(req, res) {
  const insertSql = \`${insert(entity)};\`;
  const { body } = req;
  const { ${entity.fields.join()} } = body;
  const params = [${entity.fields.join()}];

  execute(insertSql, params)
    .then((result) => {
      res.status(201).send(body);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send();
    });
}
`;
}

function read(entity) {
  return readAll(entity) + readByPrimaryKey(entity);
}

function readAll(entity) {
  return `
const getAllSql = \`${getAll(entity)};\`;
async function getAll(req, res) {
  try {
    const { rows } = await execute(getAllSql);
    res.status(200).send(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
}
`;
}

function readByPrimaryKey(entity) {
  return `
const getByFields = \`${getByPrimaryKey(entity)};\`;
async function getByPrimaryKey(req, res) {
  const { ${entity.primaryKey.join()} } = req.query;
  const params = [${entity.primaryKey.join()}];
  try {
    const { rows } = await execute(getByFields, params);
    res.status(200).send(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
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

function exportLine(entity) {
  return `
module.exports = {
  create,
  getAll,
  getByPrimaryKey,
  put,
  patch,
  deleteAll,
  deleteById
}
`;
}

module.exports = generateController;
