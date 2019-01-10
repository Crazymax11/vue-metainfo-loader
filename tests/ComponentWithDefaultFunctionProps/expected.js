module.exports = {
  events: {},
  props: {
    first: {
      default: {
        value: `default() {
  return 1;
}`,
      },
      name: 'first',
      tags: [],
      type: 'Number',
    },
    second: {
      default: {
        value: `default() {
  return 2;
}`,
      },
      name: 'second',
      tags: [],
      type: 'Number',
    },
  },
};
