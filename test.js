const { parseComponentCode } = require('./index.js');
const fs = require('fs');

describe('parseComponentCode', () => {
    it('should parse ideal file', () => {
        const code = fs.readFileSync('./testFiles/component.vue').toString();
        expect(parseComponentCode(code)).toEqual({
            description: 'Test',
            events: {
                'clicked':{
                    description: "when component is clicked"
                },
                statusChanged: {
                    type: 'boolean'
                },
                anotherStatusChanged: {
                    description: 'value is a new status',
                    type: 'boolean'
                }
            },
            props: {
                sample: {
                    description: 'Just a prop',
                    required: true,
                    type: 'Array'
                },
                short: {
                    description: 'Short prop',
                    type: 'Array'
                }
            },

        });
    })

    it('should not fall if few or wrong comments are before props or component', () => {
        const code = fs.readFileSync('./testFiles/multipleCommentsBeforeProps.vue').toString();
        expect(parseComponentCode(code)).toEqual({
            description: 'kek',
            events: {},
            props: {
                'first': {
                    description: 'lol',
                    
                    type: 'Array'
                },
                'second':{
                    description: 'Just a prop',
                
                    type: 'Array'
                },
                'propWithoutComment': {
                    type: 'Number'
                }
            }

        });
    })

    it('should output minimal info for empry component', () => {
        const code = fs.readFileSync('./testFiles/emptyComponent.vue').toString();
        expect(parseComponentCode(code)).toEqual({
            events: {},
            props: {}
        });
    })

    it('should output info for component without docs', () => {
        const code = fs.readFileSync('./testFiles/componentWithoutDocs.vue').toString();
        expect(parseComponentCode(code)).toEqual({
            events: {},
            props: 
                {'sample': {
                required: true,
                type: 'Array'
            }}
        });
    })
})