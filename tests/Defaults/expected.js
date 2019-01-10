module.exports = {
  events: {},
  props: {
    defaultArray: { default: { value: '[]' }, name: 'defaultArray', tags: [] },
    defaultArrowFunction: {
      default: { value: '() => true' },
      name: 'defaultArrowFunction',
      tags: [],
    },
    defaultBoolean: {
      default: { value: 'true' },
      name: 'defaultBoolean',
      tags: [],
    },
    defaultFunction: {
      default: { value: 'defaultStub' },
      name: 'defaultFunction',
      tags: [],
    },
    defaultMethod: {
      default: {
        value: `default() {
  return [1, 2, 3];
}`,
      },
      name: 'defaultMethod',
      tags: [],
    },
    defaultNumber: {
      default: { value: '123' },
      name: 'defaultNumber',
      tags: [],
    },
    defaultObject: {
      default: { value: '{}' },
      name: 'defaultObject',
      tags: [],
    },
    defaultString: {
      default: { value: "'string'" },
      name: 'defaultString',
      tags: [],
    },
    noDefault: { name: 'noDefault', tags: [] },
    defaultWithDescription: {
      name: 'defaultWithDescription',
      tags: [],
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
