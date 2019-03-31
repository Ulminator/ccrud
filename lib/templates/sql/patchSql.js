function patch(entity) {
  const { fields, table } = entity;
  let sql = 'SELECT';
  fields.forEach((field, idx) => {
    if (idx === fields.length -1) {
      sql += ` ${field} FROM ${table}`;
    }
    else { sql += ` ${field},` }
  });
  return sql;
}

module.exports = patch;
