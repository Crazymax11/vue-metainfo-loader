module.exports = {
  events: [],
  props: [
    {
      default: {
        value: '() => true',
        description: 'returns true',
      },
      name: 'defaultArrowFunction',
    },
    {
      default: {
        description: 'returns [1, 2, 3]',
        value: `default() {
  return [1, 2, 3];
}`,
      },
      name: 'defaultMethod',
    },

    {
      default: { value: 'defaultStub' },
      name: 'defaultFunction',
    },
    { name: 'defaultString', default: { value: "'string'" } },
    {
      default: { value: 'true' },
      name: 'defaultBoolean',
    },
    {
      default: { value: '123' },
      name: 'defaultNumber',
    },

    { name: 'defaultObject', default: { value: '{}' } },
    { default: { value: '[]' }, name: 'defaultArray' },
    { name: 'noDefault' },
    {
      name: 'defaultWithDescription',
      default: {
        description: 'This is default description',
        value: '[]',
      },
    },
  ],
  customTypes: [],
};
