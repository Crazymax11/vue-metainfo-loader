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
      type: 'Number',
    },
    second: {
      default: {
        value: `default() {
  return 2;
}`,
      },
      name: 'second',
      type: 'Number',
    },
  },
};
