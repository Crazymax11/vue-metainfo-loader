/* eslint-disable no-param-reassign */
const _ = require('lodash');
const traverse = require('babel-traverse').default;

const doctrine = require('doctrine');
const parser = require('@babel/parser');
const generate = require('@babel/generator').default;
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
function extractMeta(code) {
  const meta = {
    events: {},
    props: {},
    customTypes: [],
  };

  extractDocs(meta, code);

  extractEvents(meta, code);

  extractJsMetaInfo(meta, code);

  meta.events = _.toPairs(meta.events).map(([name, eventMeta]) =>
    _.merge({ name }, eventMeta),
  );

  meta.props = _.toPairs(meta.props).map(([name, propsMeta]) =>
    _.merge({ name }, propsMeta),
  );

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
        const propsNode = path.container
          .find(n => n.type === 'ExportDefaultDeclaration')
          .declaration.properties.find(node => node.key.name === 'props');

        // store props AST nodes
        if (propsNode) {
          propsNode.value.properties.forEach(prop => {
            const info = extractPropInfo(prop);
            _.set(meta, `props.${info.name}`, info);
          });
        }

        if (path.node.leadingComments) {
          const comments = parseLeadingComments(path.node);

          // store all typedefs in custom types
          comments
            .filter(comment =>
              comment.tags.some(tag => tag.title === 'typedef'),
            )
            .forEach(comment => {
              const { description } = comment;
              const typedefTags = comment.tags.filter(
                tag => tag.title === 'typedef',
              );

              // ine one JSDoc we can define several typedefs
              // but doctrine will parse description only for the first one
              // so we store the first with description, and others without
              meta.customTypes.push({
                description,
                type: _.head(typedefTags).type,
                name: _.head(typedefTags).name,
              });

              typedefTags.slice(1).forEach(tag => {
                meta.customTypes.push({
                  type: tag.type,
                  name: tag.name,
                });
              });
            });

          const lastComment = comments[comments.length - 1];

          meta.description = lastComment.description;

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
    name: node.key.name,
  };

  if (node.value.properties) {
    // eslint-disable-next-line no-shadow
    node.value.properties.forEach(node => {
      if (node.key.name === 'validator') {
        // method has method body in body property. Doctrine parses method node as is very nice.
        const validatorBodyAst = node.method === true ? node : node.value;

        if (_.get(node, 'leadingComments.length')) {
          const { description } = _.last(parseLeadingComments(node));

          _.set(propertyDescription, 'validator.description', description);
        }

        // If generate AST with leading comments, they will be generated before method too
        // We don't need it because we already extracted comments to description
        const { leadingComments } = node;
        delete node.leadingComments;

        _.set(
          propertyDescription,
          'validator.value',
          generate(validatorBodyAst).code,
        );

        node.leadingComments = leadingComments;

        return;
      }

      if (node.key.name === 'default') {
        if (_.get(node, 'leadingComments.length')) {
          const { description } = _.last(parseLeadingComments(node));

          _.set(propertyDescription, 'default.description', description);
        }

        if (node.kind === 'method') {
          _.set(propertyDescription, 'default.value', generate(node).code);
          return;
        }

        _.set(propertyDescription, 'default.value', generate(node.value).code);
        return;
      }

      propertyDescription[node.key.name] = node.value.name || node.value.value;
    });

    // if has no properties, it should be a short notation!
  } else if (node.value.type === 'Identifier') {
    propertyDescription.type = node.value.name;
  }

  if (node.leadingComments) {
    const { description, tags } = _.last(parseLeadingComments(node));
    propertyDescription.description = description;
    const typeTag = tags.find(({ title }) => title === 'type');
    if (typeTag) {
      propertyDescription.type = typeTag.type;
    }
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

/**
 * Parses leading comments, merging one line comments into one
 * and preparing emits, fires, type and typedef comment
 *
 * @param {Object} node
 * @returns {Array<{tags: Array, description: string}>} comments
 */
function parseLeadingComments(node) {
  if (!_.get(node, 'leadingComments.length')) {
    return [];
  }

  const comments = [];
  // TODO: refactor?
  // We need to merge one line comments into one output comment
  // and dont break comments order
  for (let i = 0; i < node.leadingComments.length; i += 1) {
    // if comment is oneline, take all oneline from this index and merge them into one
    if (node.leadingComments[i].type === 'CommentLine') {
      const inlines = _.takeWhile(node.leadingComments.slice(i), {
        type: 'CommentLine',
      })
        .map(({ value }) => parseComment(value))
        .map(comment => comment.description.trim());

      // -1 because i += 1 of for cycle
      i += inlines.length - 1;

      comments.push({
        description: inlines.join('\n'),
        tags: [],
      });

      // eslint-disable-next-line no-continue
      continue;
    }

    comments.push(parseComment(node.leadingComments[i].value));
  }

  return comments;
}

module.exports = extractMeta;
