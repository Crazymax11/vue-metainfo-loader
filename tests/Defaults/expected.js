module.exports = {
  events: {},
  props: {
    defaultArray: { default: { value: '[]' }, name: 'defaultArray' },
    defaultArrowFunction: {
      default: { value: '() => true' },
      name: 'defaultArrowFunction',
    },
    defaultBoolean: {
      default: { value: 'true' },
      name: 'defaultBoolean',
    },
    defaultFunction: {
      default: { value: 'defaultStub' },
      name: 'defaultFunction',
    },
    defaultMethod: {
      default: {
        value: `default() {
  return [1, 2, 3];
}`,
      },
      name: 'defaultMethod',
    },
    defaultNumber: {
      default: { value: '123' },
      name: 'defaultNumber',
    },
    defaultObject: {
      default: { value: '{}' },
      name: 'defaultObject',
    },
    defaultString: {
      default: { value: "'string'" },
      name: 'defaultString',
    },
    noDefault: { name: 'noDefault' },
    defaultWithDescription: {
      name: 'defaultWithDescription',
      default: {
        description: 'This is default description',
        tags: [
          {
            description: 'test',
            title: 'type',
            type: 'Array',
          },
        ],
        value: '[]',
      },
    },
  },
};
