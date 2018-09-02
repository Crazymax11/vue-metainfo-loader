const fs = require('fs');
const traverse = require('babel-traverse').default;

const doctrine = require('doctrine');
const parser = require('@babel/parser');

const MarkdownIt = require('markdown-it');
md = new MarkdownIt({
    langPrefix: ''
});


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
            events
        }
    }

    return {
        ...jsMetaInfo,
        events
    };
}

/**
 * Return html built from markdown written in <docs> tag
 * If no <docs> tag found return undefined
 *
 * @param {string} code 
 * @returns {string?} docs
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
                    const comments = doctrine.parse(
                        path.node.leadingComments[path.node.leadingComments.length - 1].value,
                        {
                            unwrap: true,
                        },
                    );

                    component.description = comments.description;
                    component.tags = comments.tags;
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
        name: node.key.name
    };

    if (node.value.properties) {
        node.value.properties.forEach(node => {

            if (node.key.name === 'validator') {
                propertyDescription['hasValidator'] = true;
                return;
            }

            propertyDescription[node.key.name] = node.value.name || node.value.value;
        });

    // if has no properties, it should be a short notation!
    } else if (node.value.type === 'Identifier') {
        propertyDescription.type = node.value.name;
    }

    if (node.leadingComments) {
        const { description, tags } = doctrine.parse(node.leadingComments[node.leadingComments.length - 1].value, {
            unwrap: true,
        });
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
    const re = /\$emit\(['"](.*)['"].*\)/g;

    let match = undefined;
    const events = [];

    while(match = re.exec(code)) {
        events.push(match[1]);
    }
    return events;
}

module.exports = function loader(code) {
    const component = parseComponentCode(code);
    return `module.exports = ${JSON.stringify(component, null, 4)}`;
};

module.exports.parseComponentCode = parseComponentCode;
