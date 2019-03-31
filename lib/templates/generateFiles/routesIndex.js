const fs = require('fs');

const { routesIndex } = require('../../paths');

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
  fs.writeFile(routesIndex, content, (err) => {
    if (err) cb(err);
  });
  cb(null);
}

module.exports = generateRoutesIndex;