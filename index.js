/* eslint-disable no-param-reassign */
const _ = require('lodash');
const traverse = require('babel-traverse').default;

const doctrine = require('doctrine');
const parser = require('@babel/parser');

const MarkdownIt = require('markdown-it');

const md = new MarkdownIt({
  langPrefix: '',
});

/**
 * @typedef {{
 *      title: string,
 *      description: string
 * }} EmitsTag
 *
 * @typedef {{
 *      title: string,
 *      description: string,
 *      type?: Object,
 *      name: string
 * }} PreparedEmitsTag
 */

/**
 * Parse SFC code and return meta info about component.
 *
 * @param {string} code
 * @returns {Object} MetaInfo.
 */
function parseComponentCode(code) {
  const meta = {
    events: {},
    props: {},
  };

  extractDocs(meta, code);

  extractEvents(meta, code);

  extractJsMetaInfo(meta, code);
  return meta;
}

/**
 * Return html built from markdown written in <docs> tag
 * If no <docs> tag found return undefined.
 *
 * @param {Object} meta
 * @param {string} code
 * @returns {Object} meta
 */
function extractDocs(meta, code) {
  if (!code.includes('<docs>') || !code.includes('</docs>')) {
    return meta;
  }

  const docsStart = code.indexOf('<docs>') + '<docs>'.length;
  const docsEnd = code.indexOf('</docs>');

  meta.docs = md.render(code.slice(docsStart, docsEnd));
  return meta;
}

/**
 * Extract metainfo from script tag.
 *
 * @param {Object} meta
 * @param {string} code
 * @returns {Object} meta
 */
function extractJsMetaInfo(meta, code) {
  // works only with JS for now
  const start = code.indexOf('<script>') + '<script>'.length;
  const end = code.indexOf('</script>');

  // eslint-disable-next-line no-param-reassign
  code = code.slice(start, end);

  const ast = parser.parse(code, {
    sourceType: 'module',

    plugins: ['dynamicImport', 'objectRestSpread'],
  });

  traverse(ast, {
    enter(path) {
      // extract default exports's JSDoc
      if (path.isExportDefaultDeclaration()) {
        if (path.node.leadingComments) {
          const comments = path.node.leadingComments.map(({ value }) =>
            parseComment(value),
          );
          const lastComment = comments[comments.length - 1];

          meta.description = lastComment.description;
          meta.tags = lastComment.tags;
          meta.comments = comments;

          /**
           * according to JSDoc fire tag
           * @see http://usejsdoc.org/tags-fires.html
           */
          const eventsJSdocTags = ['emits', 'fires'];

          lastComment.tags
            .filter(tag => eventsJSdocTags.includes(tag.title) && tag.name)
            .forEach(tag => {
              meta.events[tag.name] = _.pick(tag, ['payload', 'description']);
            });
        }
      }

      // store props AST nodes
      if (path.isIdentifier({ name: 'props' })) {
        path.container.value.properties.forEach(prop => {
          const info = extractPropInfo(prop);
          _.set(meta, `props.${info.name}`, info);
        });
      }
    },
  });

  return meta;
}

/**
 * Extract property description from babel AST node.
 *
 * @param {Object} node - babel AST node
 * @returns {Object} PropertyDescription.
 */
function extractPropInfo(node) {
  const propertyDescription = {
    tags: [],
    name: node.key.name,
  };

  if (node.value.properties) {
    // eslint-disable-next-line no-shadow
    node.value.properties.forEach(node => {
      if (node.key.name === 'validator') {
        propertyDescription.hasValidator = true;
        return;
      }

      if (
        node.key.name === 'default' &&
        (node.kind === 'method' || node.value.type === 'FunctionExpression')
      ) {
        // this is defailt() written as method

        propertyDescription[node.key.name] = 'function';
        return;
      }

      propertyDescription[node.key.name] = node.value.name || node.value.value;
    });

    // if has no properties, it should be a short notation!
  } else if (node.value.type === 'Identifier') {
    propertyDescription.type = node.value.name;
  }

  if (node.leadingComments) {
    const lastComment =
      node.leadingComments[node.leadingComments.length - 1].value;
    const { description, tags } = parseComment(lastComment);
    propertyDescription.description = description;
    propertyDescription.tags = tags;
  }

  return propertyDescription;
}

/**
 * Extracts events from SFC code.
 *
 * @param {Object} meta
 * @param {string} code
 * @returns {Object} meta
 */
function extractEvents(meta, code) {
  const re = /\$emit\(['"]([^'"]*).*/g;

  let match;

  // eslint-disable-next-line
  while (match = re.exec(code)) {
    _.set(meta, `events.${[match[1]]}`, {});
  }
  return meta;
}

/**
 * Parse comment and return doctrine AST
 * with enriched emits and fires tags.
 *
 * @param {string} value
 * @returns {{ description: string, tags: Object[] }}
 */
function parseComment(value) {
  const comment = doctrine.parse(value, { unwrap: true });
  comment.tags = comment.tags.map(tag => {
    switch (tag.title) {
      case 'emits':
      case 'fires':
        return handleJsDocEventTag(tag);
      case 'type':
      case 'typedef':
        return handleJsDocTypeTag(tag);
      default:
        return tag;
    }
  });
  return comment;
}

/**
 * Parse emits and fires JSDoc tags. Extracts payload from event description
 * Example: @fires eventname {string} description
 *
 * parsed into
 *
 * {
 *  description: 'description',
 *  name: 'eventname',
 *  payload: 'string'
 * }
 *
 * @param {Object} tag - JSDocTag.
 * @returns {Object} JSDocTag with payload.
 */
function handleJsDocEventTag(tag) {
  if (!tag.description) {
    return tag;
  }

  // trying to parse description, which is like change {ChangeEvent} - comment
  const reg = /(\w+)\s*(?:\{(.*)\})?\s*(.*)?/;
  const [
    ,
    name = '',
    typeString = '',
    description = '',
  ] = tag.description.match(reg);

  if (!name) {
    return tag;
  }

  tag.description = description.trim();

  if (!tag.description) {
    delete tag.description;
  }

  if (typeString) {
    tag.payload = typeString;
  }

  tag.name = name;
  return tag;
}

/**
 * Prepare type and typedef JSDoc tags. It tries to collapse doctrine AST to human-readable text.
 * Examples:
 * type: { name: 'string', type: 'NameExpression' }, => type: 'string'
 *
 * type: {
 *  type: 'RecordType',
 *  fields: [
 *      {
 *          type: 'FieldType',
 *          key: 'test',
 *          value: {
 *              type: 'NameExpression',
 *              name: 'string',
 *          },
 *      },
 *  ],
 * },
 * turns into
 * type: {
 *   test: 'string'
 * }
 *
 * @param {Object} tag
 * @returns {Object} tag
 */
function handleJsDocTypeTag(tag) {
  // undocumented, but exported public method
  // @see https://github.com/eslint/doctrine/blob/master/lib/doctrine.js#L895
  tag.type = doctrine.type.stringify(tag.type);

  return tag;
}

module.exports = function loader(code) {
  const component = parseComponentCode(code);
  return `module.exports = ${JSON.stringify(component, null, 4)}`;
};

module.exports.parseComponentCode = parseComponentCode;
