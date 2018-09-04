const { parseComponentCode } = require('./index.js');
const fs = require('fs');

describe('parseComponentCode', () => {
    it('should parse ideal file', () => {
        const code = fs.readFileSync('./testFiles/component.vue').toString();
        expect(parseComponentCode(code)).toEqual({
            events: [],
            description: 'Test',
            "tags": [
                {
                "description": "clicked when component is clicked",
                "title": "emits",
                },
                {
                    "description": "changed",
                    "title": "emits",
                    },
                {
                    "description": "statusChanged {boolean}",
                    "title": "emits",
                    },
                {
                    "description": "anotherStatusChanged {boolean} value is a new status",
                    "title": "emits",
                },
            ],
            props: {
                sample: {
                    name: 'sample',
                    description: 'Just a prop',
                    required: true,
                    type: 'Array',
                    tags: []
                },
                short: {
                    name: 'short',
                    description: 'Short prop',
                    type: 'Array',
                    tags: [
                        {
                            description: '[]',
                            title: 'example'
                        },
                        {
                            description: '123',
                            title: 'customTag'
                        }
                    ]
                }
            },

        });
    })

    it('should not fall if few or wrong comments are before props or component', () => {
        const code = fs.readFileSync('./testFiles/multipleCommentsBeforeProps.vue').toString();
        expect(parseComponentCode(code)).toEqual({
            description: 'kek',
            tags: [],
            events: [],
            props: {
                'first': {
                    name: 'first',
                    description: 'lol',
                    type: 'Array',
                    tags: []
                },
                'second':{
                    description: 'Just a prop',
                    name: 'second',
                    type: 'Array',
                    tags: []
                },
                'propWithoutComment': {
                    type: 'Number',
                    tags: [],
                    name: 'propWithoutComment'
                }
            }

        });
    })

    it('should output minimal info for empry component', () => {
        const code = fs.readFileSync('./testFiles/emptyComponent.vue').toString();
        expect(parseComponentCode(code)).toEqual({
            events: [],
            props: {}
        });
    })

    it('should output info for component without docs', () => {
        const code = fs.readFileSync('./testFiles/componentWithoutDocs.vue').toString();
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
        const code = fs.readFileSync('./testFiles/componentWithDocsTag.vue').toString();
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
            tags: []
        });
    })

    it('should extract events', () => {
        const code = fs.readFileSync('./testFiles/events.vue').toString();
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
            props: {}
        });
    })

    it('should extract event names from emits, where argument is a string', () => {
        const code = fs.readFileSync('./testFiles/eventWithStringArgument.vue').toString();
        expect(parseComponentCode(code)).toEqual({
            events: [
                'updateFieldValue'
            ],
            props: {}
        });
    })
})