const getAllSql = require('./getAllSql');

function getByPrimaryKeySql(entity) {
  const { primaryKey } = entity;
  let sql = getAllSql(entity);
  primaryKey.forEach((key, idx) => {
    if (idx === 0) {
      sql += ' WHERE ';
    } else {
      sql += ' AND ';
    }
    sql += `${key} = $${idx+1}`;
  });
  return sql;
}

module.exports = getByPrimaryKeySql;
