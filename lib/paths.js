const src = `${process.cwd()}/src`;
const routes = `${src}/routes`;
const controllers = `${src}/controllers`;
const database = `${src}/database`;

const index = `${src}/index.js`
const routesIndex = `${routes}/index.js`

module.exports = Object.freeze({
  src,
  routes,
  controllers,
  database,
  index,
  routesIndex
});
