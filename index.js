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
 * Parse SFC code and return meta info about component
 *
 * @param {string} code
 * @returns {Object} metaInfo
 */
function parseComponentCode(code) {
  const docs = extractDocs(code);

  const events = extractEvents(code);

  const jsMetaInfo = extractJsMetaInfo(code);

  if (docs) {
    return {
      docs,
      ...jsMetaInfo,
      events,
    };
  }

  return {
    ...jsMetaInfo,
    events,
  };
}

/**
 * Return html built from markdown written in <docs> tag
 * If no <docs> tag found return undefined
 *
 * @param {string} code
 * @returns {?string} docs
 */
function extractDocs(code) {
  if (!code.includes('<docs>') || !code.includes('</docs>')) {
    return undefined;
  }

  const docsStart = code.indexOf('<docs>') + '<docs>'.length;
  const docsEnd = code.indexOf('</docs>');

  return md.render(code.slice(docsStart, docsEnd));
}

/**
 * Extract metainfo from script tag
 * @param {string} code
 * @returns {Object} metaInfo
 */
function extractJsMetaInfo(code) {
  // works only with JS for now
  const start = code.indexOf('<script>') + '<script>'.length;
  const end = code.indexOf('</script>');

  // eslint-disable-next-line no-param-reassign
  code = code.slice(start, end);

  const ast = parser.parse(code, {
    sourceType: 'module',

    plugins: ['dynamicImport', 'objectRestSpread'],
  });

  // result
  const component = {
    props: {},
  };

  traverse(ast, {
    enter(path) {
      // extract default exports's JSDoc
      if (path.isExportDefaultDeclaration()) {
        if (path.node.leadingComments) {
          const comments = path.node.leadingComments.map(({ value }) =>
            parseComment(value),
          );
          const lastComment = comments[comments.length - 1];

          component.description = lastComment.description;
          component.tags = lastComment.tags;
          component.comments = comments;
        }
      }

      // store props AST nodes
      if (path.isIdentifier({ name: 'props' })) {
        path.container.value.properties.forEach(prop => {
          const info = extractPropInfo(prop);
          component.props[info.name] = info;
        });
      }
    },
  });

  return component;
}

/**
 * Extract property description from babel AST node
 *
 * @param {ASTNode} node
 * @returns {Object} propertyDescription
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
 * Extracts events from SFC code
 *
 * @param {string} code
 * @returns {Array<String>} events
 */
function extractEvents(code) {
  const re = /\$emit\(['"]([^'"]*).*/g;

  let match;
  const events = {};

  // eslint-disable-next-line
  while (match = re.exec(code)) {
    events[match[1]] = {};
  }
  return events;
}

/**
 * Parse comment and return doctrine AST
 * with enriched emits and fires tags
 *
 * @param {string} value
 * @returns {{ description: string, tags: Object[] }}
 */
function parseComment(value) {
  const comment = doctrine.parse(value, { unwrap: true });

  /**
   * according to JSDoc fire tag
   * @see http://usejsdoc.org/tags-fires.html
   */
  const eventsJSdocTags = ['emits', 'fires'];
  comment.tags = comment.tags.map(tag =>
    eventsJSdocTags.includes(tag.title) ? enrichEmitsTag(tag) : tag,
  );
  return comment;
}

/**
 * Parse and enrich emits or fires tag
 *
 * @param {EmitsTag} tag
 * @returns {EmitsTag | PreparedEmitsTag}
 */
function enrichEmitsTag(tag) {
  if (!tag.description) {
    return tag;
  }

  // trying to parse description, which is like change {ChangeEvent} - comment
  const reg = /(\w+)\s*(\{.*\})?[\s-]*(.*)?/;
  const [
    ,
    name = '',
    typeString = '',
    description = '',
  ] = tag.description.match(reg);

  const preparedTag = {
    ...tag,
    name: name.trim(),
    description: description.trim(),
  };

  if (typeString) {
    preparedTag.type = doctrine.parseType(typeString);
  }

  return preparedTag;
}

module.exports = function loader(code) {
  const component = parseComponentCode(code);
  return `module.exports = ${JSON.stringify(component, null, 4)}`;
};

module.exports.parseComponentCode = parseComponentCode;
