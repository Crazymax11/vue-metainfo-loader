module.exports = {
  description: 'component with custom types',
  events: [],
  props: [],
  customTypes: [
    {
      name: 'NumberLike',
      description:
        'short description\nA number, or a string containing a number.',
      type: '(number | string)',
    },
    {
      name: 'NumberAlias',
      description:
        'short description\nA number, or a string containing a number.',
      type: 'number',
    },
    {
      name: 'Point',
      description: 'short description of object\nPoint in x, y space',
      type: '{x: number, y: number}',
    },
    {
      name: 'XYPoint',
      description: 'long description\nPoint in x, y space',
      type: 'Object',
    },
    {
      name: 'MultineLineWithOneProp',
      description: 'multiline',
      type: '{test: string}',
    },
    {
      name: 'MultiLineWithManyProps',
      description: 'multiline',
      type: '{title: string, description: string, type: Object, name: string}',
    },
  ],
};
