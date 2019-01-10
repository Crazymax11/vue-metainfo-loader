module.exports = {
  events: {},
  props: {
    defaultArray: { default: '[]', name: 'defaultArray', tags: [] },
    defaultArrowFunction: {
      default: '() => true',
      name: 'defaultArrowFunction',
      tags: [],
    },
    defaultBoolean: { default: 'true', name: 'defaultBoolean', tags: [] },
    defaultFunction: {
      default: 'defaultStub',
      name: 'defaultFunction',
      tags: [],
    },
    defaultMethod: {
      default: `default() {
  return [1, 2, 3];
}`,
      name: 'defaultMethod',
      tags: [],
    },
    defaultNumber: { default: '123', name: 'defaultNumber', tags: [] },
    defaultObject: { default: '{}', name: 'defaultObject', tags: [] },
    defaultString: { default: "'string'", name: 'defaultString', tags: [] },
    noDefault: { name: 'noDefault', tags: [] },
  },
};
