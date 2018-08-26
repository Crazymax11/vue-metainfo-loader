const fs = require('fs');
const traverse = require('babel-traverse').default;

const doctrine = require('doctrine');
const parser = require('@babel/parser');

function parseComponentCode(code) {
    // works only with JS for now
    const start = code.indexOf('<script>') + '<script>'.length;
    const end = code.indexOf('</script>');

    code = code.slice(start, end);

    const ast = parser.parse(code, {
        sourceType: 'module',

        plugins: ['dynamicImport', 'objectRestSpread'],
    });

    const props = [];

    // result
    const component = {
        events: {},
        props: {},
    };
    traverse(ast, {
        enter(path) {
            if (path.isExportDefaultDeclaration()) {
                if (path.node.leadingComments) {
                    const comments = doctrine.parse(
                        path.node.leadingComments[path.node.leadingComments.length - 1].value,
                        {
                            unwrap: true,
                        },
                    );

                    component.description = comments.description;

                    const re = /(\w+)\s(\{.*\})?(.*)/;
                    comments.tags.filter(tag => tag.title === 'emits').forEach(tag => {
                        const match = tag.description.match(re);
                        if (!match) {
                            return;
                        }
                        const [, name, type, description] = match;

                        component.events[name] = {}
                        const event = {
                            name: match[1],
                            description: match[3].trim(),
                        };

                        if (match[2]) {
                            component.events[name].type = match[2].slice(1, -1);
                        }

                        if (event.description.trim()) {
                            component.events[name].description = event.description.trim();
                        }
                    });
                }
            }

            if (path.isIdentifier({ name: 'props' })) {
                path.container.value.properties.forEach(node => {
                    props.push(node);
                });
            }
        },
    });

    props.forEach(prop => {
        const propDescr = {
        };
        component.props[prop.key.name] = propDescr;

        if (prop.value.properties) {
            prop.value.properties.forEach(prop => {
                if (prop.key.name === 'validator') {
                    return;
                }
                propDescr[prop.key.name] = prop.value.name || prop.value.value;
            });
        // if has no properties, it should be a short notation!
        } else if (prop.value.type === 'Identifier') {
            propDescr.type = prop.value.name;
        }

        if (prop.leadingComments) {
            const { description, tags } = doctrine.parse(prop.leadingComments[prop.leadingComments.length - 1].value, {
                unwrap: true,
            });
            propDescr.description = description;
        }
    });

    return component;
}

module.exports = function loader(code) {
    const component = parseComponentCode(code);
    return `module.exports = ${JSON.stringify(component, null, 4)}`;
};

module.exports.parseComponentCode = parseComponentCode;
