module.exports = {
  events: {
    clicked: {
      description: 'when component is clicked',
    },
    changed: {},
    statusChanged: {
      payload: 'boolean',
    },
    anotherStatusChanged: {
      payload: 'boolean',
      description: 'value is a new status',
    },
  },
  description: 'Test',
  tags: [
    {
      name: 'clicked',
      description: 'when component is clicked',
      title: 'emits',
    },
    {
      name: 'changed',
      title: 'emits',
    },
    {
      name: 'statusChanged',
      title: 'emits',
      payload: 'boolean',
    },
    {
      name: 'anotherStatusChanged',
      description: 'value is a new status',
      title: 'emits',
      payload: 'boolean',
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
          title: 'emits',
        },
        {
          name: 'statusChanged',
          title: 'emits',
          payload: 'boolean',
        },
        {
          name: 'anotherStatusChanged',
          description: 'value is a new status',
          title: 'emits',
          payload: 'boolean',
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
