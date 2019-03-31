const insertSql = require('./insertSql');

function putSql(entity) {
  const { fields, primaryKey } = entity;
  let sql = insertSql(entity);

  primaryKey.forEach((key, idx) => {
    if (idx === 0) {
      sql += ' ON CONFLICT (';
    }
    if (idx === primaryKey.length - 1) {
      sql += `${key}) DO UPDATE SET `;
    } else {
      sql += `${key},`;
    }
  });

  diff = fields.filter(x => !primaryKey.includes(x));
  diff.forEach((field, idx) => {
    if (idx === diff.length - 1) {
      sql += `${field} = EXCLUDED.${field} `;
    } else {
      sql += `${field} = EXCLUDED.${field}, `;
    }
  });

  return sql;
}

module.exports = putSql;
