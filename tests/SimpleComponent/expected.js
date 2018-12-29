module.exports = {
  events: [],
  description: 'Test',
  tags: [
    {
      name: 'clicked',
      description: 'when component is clicked',
      title: 'emits',
    },
    {
      name: 'changed',
      description: '',
      title: 'emits',
    },
    {
      name: 'statusChanged',
      description: '',
      title: 'emits',
      type: {
        type: 'RecordType',
        fields: [
          {
            key: 'boolean',
            type: 'FieldType',
            value: null,
          },
        ],
      },
    },
    {
      name: 'anotherStatusChanged',
      description: 'value is a new status',
      title: 'emits',
      type: {
        type: 'RecordType',
        fields: [
          {
            key: 'boolean',
            type: 'FieldType',
            value: null,
          },
        ],
      },
    },
  ],
  comments: [
    {
      description: 'Test',
      tags: [
        {
          name: 'clicked',
          description: 'when component is clicked',
          title: 'emits',
        },
        {
          name: 'changed',
          description: '',
          title: 'emits',
        },
        {
          name: 'statusChanged',
          description: '',
          title: 'emits',
          type: {
            type: 'RecordType',
            fields: [
              {
                key: 'boolean',
                type: 'FieldType',
                value: null,
              },
            ],
          },
        },
        {
          name: 'anotherStatusChanged',
          description: 'value is a new status',
          title: 'emits',
          type: {
            type: 'RecordType',
            fields: [
              {
                key: 'boolean',
                type: 'FieldType',
                value: null,
              },
            ],
          },
        },
      ],
    },
  ],
  props: {
    sample: {
      name: 'sample',
      description: 'Just a prop',
      required: true,
      type: 'Array',
      tags: [],
    },
    short: {
      name: 'short',
      description: 'Short prop',
      type: 'Array',
      tags: [
        {
          description: '[]',
          title: 'example',
        },
        {
          description: '123',
          title: 'customTag',
        },
      ],
    },
  },
};
