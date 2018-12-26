module.exports = [
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
];
