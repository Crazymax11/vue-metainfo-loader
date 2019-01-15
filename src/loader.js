const extractMeta = require('./extractMeta.js');

module.exports = function loader(code) {
  let meta;
  try {
    meta = extractMeta(code);
  } catch (err) {
    console.warn(
      `vue-metainfo-loader: Error has occured while processing componentName: ${
        err.message
      }`,
    );

    console.error(err);
    return code;
  }

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

  return modifiedCode;
};
