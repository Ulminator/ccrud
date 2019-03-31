const fs = require('fs');
const { index } = require('../../paths');

const content = `
const express = require('express');

const routes = require('./routes');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('hi');
});

const PORT = process.env.PORT || 8080;

app.use('/api', routes);

app.listen(PORT, () => {
  console.log('listening');
});
`;

function generateIndex(cb) {
  fs.writeFile(index, content, (err) => {
    if (err) cb(err);
  });
  cb(null);
}

module.exports = generateIndex;
