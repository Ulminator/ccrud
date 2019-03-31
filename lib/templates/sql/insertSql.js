function insertSql(entity) {
  const { fields, table } = entity;
  let sql = `INSERT INTO ${table} (`;
  fields.forEach((field, idx) => {
    if (idx === fields.length - 1) {
      sql += `${field}) VALUES (`;
    }
    else { sql += `${field},` }
  });
  fields.forEach((field, idx) => {
    if (idx === fields.length - 1) {
      sql += `$${idx + 1})`;
    }
    else { sql += `$${idx + 1},` }
  });
  return sql;
}

module.exports = insertSql;
