const extractMeta = require('./extractMeta.js');

module.exports = function loader(code) {
  const meta = extractMeta(code);

  // TODO: make via AST
  const modifiedCode = code.replace(
    'export default {',
    `export default {
  meta: ${JSON.stringify(meta, null, 4)},
  `,
  );

  return `module.exports = ${modifiedCode}`;
};
