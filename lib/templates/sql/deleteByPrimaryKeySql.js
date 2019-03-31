const getAllSql = require('./getAllSql');

function eraseByPrimaryKeySql(entity) {
  const { table, primaryKey } = entity;
  let sql = `DELETE FROM ${table}`
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

module.exports = eraseByPrimaryKeySql;
