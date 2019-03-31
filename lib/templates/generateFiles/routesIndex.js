const fs = require('fs');

const srcPath = `${process.cwd()}/src`;

const content = `
const { Router } = require('express');
// import userRoutes from './userRoutes';
// import postRoutes from './postRoutes';
// import commentRoutes from './commentRoutes';
// import replyRoutes from './replyRoutes';

const router = Router();

// router.use('/users', userRoutes);
// router.use('/posts', postRoutes);
// router.use('/comments', commentRoutes);
// router.use('/replies', replyRoutes);

router.get('/health', (req, res) => {
  res.status(200).send({ status: 'UP' });
});

module.exports = router;
`;

function generateRoutesIndex(cb) {
  const routesIndexPath = `${srcPath}/routes/index.js`;
  fs.writeFile(routesIndexPath, content, (err) => {
    if (err) cb(err);
  });
  cb(null);
}

module.exports = generateRoutesIndex;