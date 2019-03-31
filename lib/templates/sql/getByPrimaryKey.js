const getAll = require('./getAll');

function getById(entity) {
  const { primaryKey } = entity;
  let sql = getAll(entity);
  primaryKey.forEach((key, idx) => {
    if (idx == 0) {
      sql += ' WHERE ';
    } else {
      sql += ' AND ';
    }
    sql += `${key} = $${idx+1}`;
  });
  return sql;
}

module.exports = getById;