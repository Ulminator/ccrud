const src = `${process.cwd()}/src`;
const routes = `${src}/routes`;
const controllers = `${src}/controllers`;

const index = `${src}/index.js`
const routesIndex = `${routes}/index.js`

module.exports = Object.freeze({
  src,
  routes,
  controllers,
  index,
  routesIndex
});
