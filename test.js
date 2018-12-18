const { parseComponentCode } = require('./index.js');
const fs = require('fs');

describe('parseComponentCode', () => {
    it('should parse ideal file', () => {
        const code = fs.readFileSync('./testFiles/component.vue').toString();
        expect(parseComponentCode(code)).toEqual({
            events: [],
            description: 'Test',
            tags: [
                {
                    name: 'clicked',
                    description: 'when component is clicked',
                    title: 'emits'
                },
                {
                    name: 'changed',
                    description: '',
                    title: 'emits'
                },
                {
                    name: 'statusChanged',
                    description: '',
                    title: 'emits',
                    type: {
                        type: 'RecordType',
                        fields: [{
                            key: 'boolean',
                            type: 'FieldType',
                            value: null
                        }]
                    }
                },
                {
                    name: 'anotherStatusChanged',
                    description: 'value is a new status',
                    title: 'emits',
                    type: {
                        type: 'RecordType',
                        fields: [{
                            key: 'boolean',
                            type: 'FieldType',
                            value: null
                        }]
                    }
                }
            ],
            comments: [
                {
                    description: 'Test',
                    tags: [
                        {
                            name: 'clicked',
                            description: 'when component is clicked',
                            title: 'emits'
                        },
                        {
                            name: 'changed',
                            description: '',
                            title: 'emits'
                        },
                        {
                            name: 'statusChanged',
                            description: '',
                            title: 'emits',
                            type: {
                                type: 'RecordType',
                                fields: [{
                                    key: 'boolean',
                                    type: 'FieldType',
                                    value: null
                                }]
                            }
                        },
                        {
                            name: 'anotherStatusChanged',
                            description: 'value is a new status',
                            title: 'emits',
                            type: {
                                type: 'RecordType',
                                fields: [{
                                    key: 'boolean',
                                    type: 'FieldType',
                                    value: null
                                }]
                            }
                        }
                    ]
                }
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
            comments: [
                {
                    description: 'lol',
                    tags: []
                },
                {
                    description: 'Test',
                    tags: []
                },
                {
                    description: 'kek',
                    tags: []
                }
            ],
            events: [],
            props: {
                first: {
                    name: 'first',
                    description: 'lol',
                    type: 'Array',
                    tags: []
                },
                second:{
                    description: 'Just a prop',
                    name: 'second',
                    type: 'Array',
                    tags: []
                },
                propWithoutComment: {
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
        const code = fs.readFileSync('./testFiles/componentsWithMultipleComments.vue').toString();
        expect(parseComponentCode(code)).toEqual({
            props: {
                superProp: {
                    tags: [
                        {
                            description: null,
                            title: 'type',
                            type: {
                                type: 'NameExpression',
                                name: 'Prop'
                            }
                        }
                    ],
                    name: 'superProp',
                    type: 'Object',
                    description: 'Typed Prop'
                }
            },
            description: 'Awesome component',
            tags: [
                {
                    name: 'change',
                    title: 'emits',
                    description: ''
                }
            ],
            comments: [
                {
                    description: '',
                    tags: [
                        {
                            title: 'event',
                            description: 'ChangeEvent'
                        },
                        {
                            title: 'type',
                            description: 'new value',
                            type: {
                                type: 'NameExpression',
                                name: 'string'
                            }
                        }
                    ]
                },
                {
                    description: '',
                    tags: [
                        {
                            title: 'typedef',
                            description: null,
                            type: {
                                type: 'RecordType',
                                fields: [
                                    {
                                        type: 'FieldType',
                                        key: 'test',
                                        value: {
                                            type: 'NameExpression',
                                            name: 'string'
                                        }
                                    }
                                ]
                            },
                            name: 'Prop'
                        }
                    ]
                },
                {
                    description: 'Awesome component',
                    tags: [
                        {
                            name: 'change',
                            title: 'emits',
                            description: ''
                        }
                    ]
                }
            ],
            events: []
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

    it('should parse props which have default value computed by function', () => {
        const code = fs.readFileSync('./testFiles/componentWithDefaultFunctionProps.vue').toString();
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
        const code = fs.readFileSync('./testFiles/eventsWithTypes.vue').toString();
        expect(parseComponentCode(code).comments).toEqual([
           {
               description: 'Comment without events',
               tags: []
           },
           {
               description: '',
               tags: [
                   {
                       title: 'event',
                       description: 'ChangeEvent'
                   },
                   {
                       title: 'type',
                       description: 'new value',
                       type: {
                           type: 'NameExpression',
                           name: 'string'
                       }
                   }
               ]
           },
           {
               description: '',
               tags: [
                   {
                       title: 'emits',
                       description: '',
                       name: 'hello',
                       type: {
                           type: 'RecordType',
                           fields: [
                               {
                                   type: 'FieldType',
                                   key: 'number',
                                   value: null
                               }
                           ]
                       }
                   },
                   {
                       title: 'emits',
                       description: 'comment',
                       name: 'change',
                       type: {
                           type: 'RecordType',
                           fields: [
                               {
                                   type: 'FieldType',
                                   key: 'ChangeEvent',
                                   value: null
                               }
                           ]
                       }
                   },
                   {
                       title: 'emits',
                       description: 'comment',
                       name: 'set',
                       type: {
                           type: 'RecordType',
                           fields: [
                               {
                                   type: 'FieldType',
                                   key: 'string',
                                   value: null
                               }
                           ]
                       }
                   },
                   {
                       title: 'fires',
                       description: 'comment',
                       name: 'update'
                   },
                   {
                       title: 'fires',
                       description: '',
                       name: 'delete'
                   },
                   {
                       title: 'fires',
                       description: null
                   }
               ]
           }
       ]);
    })
})