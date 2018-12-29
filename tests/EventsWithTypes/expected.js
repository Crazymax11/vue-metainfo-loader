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
          type: 'string',
        },
      ],
    },
    {
      description: '',
      tags: [
        {
          name: 'hello',
          title: 'emits',
          payload: 'number',
        },
        {
          description: '- comment',
          name: 'change',
          title: 'emits',
          payload: 'ChangeEvent',
        },
        {
          description: 'comment',
          name: 'set',
          title: 'emits',
          payload: 'string',
        },
        { description: 'comment', name: 'update', title: 'fires' },
        { name: 'delete', title: 'fires' },
        { description: null, title: 'fires' },
      ],
    },
  ],
  description: '',
  events: {
    hello: {
      payload: 'number',
    },
    change: {
      payload: 'ChangeEvent',
      description: '- comment',
    },
    set: { payload: 'string', description: 'comment' },
    update: { description: 'comment' },
    delete: {},
  },
  props: {},
  tags: [
    {
      name: 'hello',
      title: 'emits',
      payload: 'number',
    },
    {
      description: '- comment',
      name: 'change',
      title: 'emits',
      payload: 'ChangeEvent',
    },
    {
      description: 'comment',
      name: 'set',
      title: 'emits',
      payload: 'string',
    },
    { description: 'comment', name: 'update', title: 'fires' },
    { name: 'delete', title: 'fires' },
    { description: null, title: 'fires' },
  ],
};
