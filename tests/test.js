const { parseComponentCode } = require('../index.js');
const fs = require('fs');

const componentFixture = require('./fixtures/component.js');
const multipleCommentsBeforePropsFixture = require('./fixtures/multipleCommentsBeforeProps.js');
const componentsWithMultipleCommentsFixture = require('./fixtures/componentsWithMultipleComments.js');
const eventsWithTypesFixture = require('./fixtures/eventsWithTypes.js');

describe('parseComponentCode', () => {
    it('should parse ideal file', () => {
        const code = fs.readFileSync('./tests/files/component.vue').toString();
        expect(parseComponentCode(code)).toEqual(componentFixture);
    })

    it('should not fall if few or wrong comments are before props or component', () => {
        const code = fs.readFileSync('./tests/files/multipleCommentsBeforeProps.vue').toString();
        expect(parseComponentCode(code)).toEqual(multipleCommentsBeforePropsFixture);
    })

    it('should output minimal info for empry component', () => {
        const code = fs.readFileSync('./tests/files/emptyComponent.vue').toString();
        expect(parseComponentCode(code)).toEqual({
            events: [],
            props: {}
        });
    })

    it('should output info for component without docs', () => {
        const code = fs.readFileSync('./tests/files/componentWithoutDocs.vue').toString();
        expect(parseComponentCode(code)).toEqual({
            events: [],
            props:
                {
                    'sample': {
                        name: 'sample',
                        required: true,
                        tags: [],
                        type: 'Array'
                    }
                }
            }
        );
    })

    it('should parse <docs> tag', () => {
        const code = fs.readFileSync('./tests/files/componentWithDocsTag.vue').toString();
        expect(parseComponentCode(code)).toEqual({
            events: [],
            description: 'Component with docs tag',
            docs: `<h1>Component with docs tag</h1>
<h2>h2</h2>
<h3>h3</h3>
<h4>h4</h4>
<h5>h5</h5>
<h6>h6</h6>
<ul>
<li>list-item-1</li>
<li>list-item-2
<ul>
<li>list-item-2-1</li>
</ul>
</li>
</ul>
<p><strong>This text is bold</strong>
<em>This text is italic</em></p>
<pre><code class=\"js\">code block
</code></pre>
`,
            props: {},
            tags: [],
            comments: [
                {
                    description: 'Component with docs tag',
                    tags: []
                }
            ]
        });
    })

    it('should extract events', () => {
        const code = fs.readFileSync('./tests/files/events.vue').toString();
        expect(parseComponentCode(code)).toEqual({
            description: 'TestEvents',
            events: [
                "$emitInHtml",
                "$emitInHtmlWithArg",
                "$emitInPug",
                "$emitInPugWithArg",
                "$emitInJs",
                "$emitInJsWithArg"
            ],
            tags: [],
            props: {},
            comments: [
                {
                    description: 'TestEvents',
                    tags: []
                }
            ]
        });
    })

    it('should parse all component comments', () => {
        const code = fs.readFileSync('./tests/files/componentsWithMultipleComments.vue').toString();
        expect(parseComponentCode(code)).toEqual(componentsWithMultipleCommentsFixture);
    })

    it('should extract event names from emits, where argument is a string', () => {
        const code = fs.readFileSync('./tests/files/eventWithStringArgument.vue').toString();
        expect(parseComponentCode(code)).toEqual({
            events: [
                'updateFieldValue'
            ],
            props: {}
        });
    })

    it('should parse props which have default value computed by function', () => {
        const code = fs.readFileSync('./tests/files/componentWithDefaultFunctionProps.vue').toString();
        expect(parseComponentCode(code)).toEqual({
            events: [],
            props: {
                first: {
                    type: 'Number',
                    default: 'function',
                    name: 'first',
                    tags: []
                },
                second: {
                    type: 'Number',
                    default: 'function',
                    name: 'second',
                    tags: []
                }
            }
        });
    })

    it('should parse event types from emits and fires tags', () => {
        const code = fs.readFileSync('./tests/files/eventsWithTypes.vue').toString();
        expect(parseComponentCode(code).comments).toEqual(eventsWithTypesFixture);
    })
})