const { parseComponentCode } = require('./index.js');
const fs = require('fs');

describe('parseComponentCode', () => {
    it('should parse ideal file', () => {
        const code = fs.readFileSync('./testFiles/component.vue').toString();
        expect(parseComponentCode(code)).toEqual({
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
                    description: 'Just a prop',
                    required: true,
                    type: 'Array',
                    tags: []
                },
                short: {
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
            props: {
                'first': {
                    description: 'lol',
                    type: 'Array',
                    tags: []
                },
                'second':{
                    description: 'Just a prop',
                
                    type: 'Array',
                    tags: []
                },
                'propWithoutComment': {
                    type: 'Number',
                    tags: []
                }
            }

        });
    })

    it('should output minimal info for empry component', () => {
        const code = fs.readFileSync('./testFiles/emptyComponent.vue').toString();
        expect(parseComponentCode(code)).toEqual({
            props: {}
        });
    })

    it('should output info for component without docs', () => {
        const code = fs.readFileSync('./testFiles/componentWithoutDocs.vue').toString();
        expect(parseComponentCode(code)).toEqual({
            props: 
                {
                    'sample': {
                        required: true,
                        tags: [],
                        type: 'Array'
                    }
                }
            }
        );
    })
})