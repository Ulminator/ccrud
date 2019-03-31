const fs = require('fs');
const { execute } = require('../../paths');

const content = `const { Pool } = require('pg');

const config = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  database: 'postgres',
};

const pool = new Pool(config);

pool.on('error', (err, client) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

async function execute(statement, params) {
  const client = await pool.connect();
  try {
    let res;
    if (params === undefined) { res = await client.query(statement); }
    else { res = await client.query(statement, params); }
    return res;
  } catch (err) { throw err; }
  finally { client.release(); }
}

module.exports = execute;
`;

function generateExecute(cb) {
  fs.writeFile(execute, content, (err) => {
    if (err) cb(err);
  });
  cb(null);
}

module.exports = generateExecute;
