module.exports = {
  comments: [
    {
      description:
        'short description\nA number, or a string containing a number.',
      tags: [
        {
          description: null,
          name: 'NumberLike',
          title: 'typedef',
          type: '(number | string)',
        },
      ],
    },
    {
      description:
        'short description\nA number, or a string containing a number.',
      tags: [
        {
          description: null,
          name: 'NumberAlias',
          title: 'typedef',
          type: 'number',
        },
      ],
    },
    {
      description: 'short description of object\nPoint in x, y space',
      tags: [
        {
          description: null,
          name: 'Point',
          title: 'typedef',
          type: '{x: number, y: number}',
        },
      ],
    },
    {
      description: 'long description\nPoint in x, y space',
      tags: [
        {
          description: null,
          name: 'XYPoint',
          title: 'typedef',
          type: 'Object',
        },
        {
          description: 'x coordinate',
          name: 'x',
          title: 'property',
          type: { name: 'number', type: 'NameExpression' },
        },
        {
          description: 'y coordinate',
          name: 'y',
          title: 'property',
          type: { name: 'number', type: 'NameExpression' },
        },
      ],
    },
    {
      description: 'multiline',
      tags: [
        {
          description: null,
          name: 'MultineLineWithOneProp',
          title: 'typedef',
          type: '{test: string}',
        },
      ],
    },
    {
      description: 'multiline',
      tags: [
        {
          description: null,
          name: 'MultiLineWithManyProps',
          title: 'typedef',
          type:
            '{title: string, description: string, type: Object, name: string}',
        },
      ],
    },
    { description: 'component with custom types', tags: [] },
  ],
  description: 'component with custom types',
  events: {},
  props: {},
  tags: [],
  customTypes: {
    NumberLike: {
      description:
        'short description\nA number, or a string containing a number.',
      type: '(number | string)',
    },
    NumberAlias: {
      description:
        'short description\nA number, or a string containing a number.',
      type: 'number',
    },
    Point: {
      description: 'short description of object\nPoint in x, y space',
      type: '{x: number, y: number}',
    },
    XYPoint: {
      description: 'long description\nPoint in x, y space',
      type: 'Object',
    },
    MultineLineWithOneProp: {
      description: 'multiline',
      type: '{test: string}',
    },
    MultiLineWithManyProps: {
      description: 'multiline',
      type: '{title: string, description: string, type: Object, name: string}',
    },
  },
};
