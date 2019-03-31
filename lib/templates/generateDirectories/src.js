const fs = require('fs');
const rimraf = require('rimraf');

const srcPath = `${process.cwd()}/src`;

function generateSrc(cb) {
  if (fs.existsSync(srcPath)) {
    rimraf(srcPath, (err) => {
      if (err) cb(err);
      fs.mkdir(srcPath, (err) => {
        if (err) cb(err);
        cb(null);
      });
    });
  } else {
    fs.mkdir(srcPath, (err) => {
      if (err) cb(err);
      cb(null);
    });
  }
}

module.exports = generateSrc;
