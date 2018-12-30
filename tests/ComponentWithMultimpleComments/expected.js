module.exports = {
  props: {
    superProp: {
      tags: [
        {
          description: null,
          title: 'type',
          type: 'Prop',
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
          type: 'string',
        },
      ],
    },
    {
      description: '',
      tags: [
        {
          title: 'typedef',
          description: null,
          type: '{test: string}',
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
        },
      ],
    },
  ],
  events: { change: {} },
  customTypes: {
    Prop: '{test: string}',
  },
};
