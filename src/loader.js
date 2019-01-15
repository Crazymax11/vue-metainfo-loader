const extractMeta = require('./extractMeta.js');

module.exports = function loader(code) {
  const meta = extractMeta(code);

  const re = /[^\\/@]+\.vue/;
  const matched = this.resourcePath.match(re);
  const name = matched ? matched[0].replace('.vue', '') : '';

  if (name) {
    meta.name = name;
  }

  // TODO: make via AST
  const modifiedCode = code.replace(
    'export default {',
    `export default {
  meta: ${JSON.stringify(meta, null, 4)},
  `,
  );

  return `module.exports = ${modifiedCode}`;
};
