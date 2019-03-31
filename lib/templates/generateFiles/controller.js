const fs = require('fs');

const { controllers } = require('../../paths');

const insertSql = require('../sql/insertSql');
const getAllSql = require('../sql/getAllSql');
const getByPrimaryKeySql = require('../sql/getByPrimaryKeySql');
const putSql = require('../sql/putSql');
const patchSql = require('../sql/patchSql');
const deleteByPrimaryKeySql = require('../sql/deleteByPrimaryKeySql');

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
  return create(entity) + read(entity) + update(entity) + deleteByPrimaryKey(entity);
}

function create(entity) {
  return `
const insertSql = \`${insertSql(entity)};\`;
async function create(req, res) {
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
const getAllSql = \`${getAllSql(entity)};\`;
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
const getByPrimaryKeySql = \`${getByPrimaryKeySql(entity)};\`;
async function getByPrimaryKey(req, res) {
  const { ${entity.primaryKey.join()} } = req.query;
  const params = [${entity.primaryKey.join()}];
  try {
    const { rows } = await execute(getByPrimaryKeySql, params);
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
const putSql = \`${putSql(entity)};\`;
async function put(req, res) {
  res.status(200).send('put');
}

const patchSql = \`${patchSql(entity)};\`;
async function patch(req, res) {
  res.status(200).send('patch');
}
`;
}

function deleteByPrimaryKey(entity) {
  return `
const deleteByPrimaryKeySql = \`${deleteByPrimaryKeySql(entity)};\`;
async function deleteByPrimaryKey(req, res) {
  const { ${entity.primaryKey.join()} } = req.query;
  const params = [${entity.primaryKey.join()}];

  execute(deleteByPrimaryKeySql, params)
    .then((result) => {
      res.status(204).send();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send();
    });
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
  deleteByPrimaryKey
}
`;
}

module.exports = generateController;
