module.exports = {
  events: {},
  props: {
    first: {
      default: `default() {
  return 1;
}`,
      name: 'first',
      tags: [],
      type: 'Number',
    },
    second: {
      default: `default() {
  return 2;
}`,
      name: 'second',
      tags: [],
      type: 'Number',
    },
  },
};
