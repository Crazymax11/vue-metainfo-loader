module.exports = {
  props: {
    superProp: {
      name: 'superProp',
      type: 'Prop',
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
    Prop: {
      description: '',
      type: '{test: string}',
    },
  },
};
