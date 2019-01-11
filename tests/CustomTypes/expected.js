module.exports = {
  description: 'component with custom types',
  events: [],
  props: [],
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
