module.exports = {
  description: `Line 1
Line 2`,
  customTypes: [],
  events: [],
  props: [
    {
      name: 'propWithMultilineComment',
      default: {
        description: `Default
comment`,
        value: "'test'",
      },
      description: `line 1
line 2`,
      validator: {
        value: `validator() {
  return true;
}`,
        description: `Validator
comment`,
      },
    },
    {
      name: 'propWithOneComment',
      description: 'line 1',
      default: {
        description: `Default comment`,
        value: "'test'",
      },
      validator: {
        description: `Validator comment`,
        value: `validator() {
  return true;
}`,
      },
    },
  ],
};
