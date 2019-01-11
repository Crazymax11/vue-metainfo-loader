module.exports = {
  events: [],
  props: [
    {
      name: 'first',
      default: {
        value: `default() {
  return 1;
}`,
      },
      type: 'Number',
    },
    {
      name: 'second',
      default: {
        value: `default() {
  return 2;
}`,
      },
      type: 'Number',
    },
  ],
};
