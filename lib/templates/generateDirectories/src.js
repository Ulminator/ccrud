const fs = require('fs');
const rimraf = require('rimraf');

const { src } = require('../../paths');

function generateSrc(cb) {
  if (fs.existsSync(src)) {
    rimraf(src, (err) => {
      if (err) cb(err);
      fs.mkdir(src, (err) => {
        if (err) cb(err);
        cb(null);
      });
    });
  } else {
    fs.mkdir(src, (err) => {
      if (err) cb(err);
      cb(null);
    });
  }
}

module.exports = generateSrc;
