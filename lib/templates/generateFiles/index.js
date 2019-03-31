const fs = require('fs');
const { index } = require('../../paths');

function generateIndex(cb) {
  fs.writeFile(index, content, (err) => {
    if (err) cb(err);
  });
  cb(null);
}

const content = `const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('base endpoint');
});

const PORT = process.env.PORT || 8080;

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(\`http://localhost:\${PORT}/\`);
});
`;

module.exports = generateIndex;
