module.exports = {
  comments: [
    { description: 'Comment without events', tags: [] },
    {
      description: '',
      tags: [
        { description: 'ChangeEvent', title: 'event' },
        {
          description: 'new value',
          title: 'type',
          type: { name: 'string', type: 'NameExpression' },
        },
      ],
    },
    {
      description: '',
      tags: [
        {
          description: '',
          name: 'hello',
          title: 'emits',
          type: {
            fields: [{ key: 'number', type: 'FieldType', value: null }],
            type: 'RecordType',
          },
        },
        {
          description: 'comment',
          name: 'change',
          title: 'emits',
          type: {
            fields: [{ key: 'ChangeEvent', type: 'FieldType', value: null }],
            type: 'RecordType',
          },
        },
        {
          description: 'comment',
          name: 'set',
          title: 'emits',
          type: {
            fields: [{ key: 'string', type: 'FieldType', value: null }],
            type: 'RecordType',
          },
        },
        { description: 'comment', name: 'update', title: 'fires' },
        { description: '', name: 'delete', title: 'fires' },
        { description: null, title: 'fires' },
      ],
    },
  ],
  description: '',
  events: {},
  props: {},
  tags: [
    {
      description: '',
      name: 'hello',
      title: 'emits',
      type: {
        fields: [{ key: 'number', type: 'FieldType', value: null }],
        type: 'RecordType',
      },
    },
    {
      description: 'comment',
      name: 'change',
      title: 'emits',
      type: {
        fields: [{ key: 'ChangeEvent', type: 'FieldType', value: null }],
        type: 'RecordType',
      },
    },
    {
      description: 'comment',
      name: 'set',
      title: 'emits',
      type: {
        fields: [{ key: 'string', type: 'FieldType', value: null }],
        type: 'RecordType',
      },
    },
    { description: 'comment', name: 'update', title: 'fires' },
    { description: '', name: 'delete', title: 'fires' },
    { description: null, title: 'fires' },
  ],
};
