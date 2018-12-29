module.exports = {
  props: {
    superProp: {
      tags: [
        {
          description: null,
          title: 'type',
          type: {
            type: 'NameExpression',
            name: 'Prop',
          },
        },
      ],
      name: 'superProp',
      type: 'Object',
      description: 'Typed Prop',
    },
  },
  description: 'Awesome component',
  tags: [
    {
      name: 'change',
      title: 'emits',
      description: '',
    },
  ],
  comments: [
    {
      description: '',
      tags: [
        {
          title: 'event',
          description: 'ChangeEvent',
        },
        {
          title: 'type',
          description: 'new value',
          type: {
            type: 'NameExpression',
            name: 'string',
          },
        },
      ],
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
                  name: 'string',
                },
              },
            ],
          },
          name: 'Prop',
        },
      ],
    },
    {
      description: 'Awesome component',
      tags: [
        {
          name: 'change',
          title: 'emits',
          description: '',
        },
      ],
    },
  ],
  events: {},
};
