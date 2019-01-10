module.exports = {
  props: {
    validatorArrowFunction: {
      validator: '() => true',
      name: 'validatorArrowFunction',
      tags: [],
    },
    noValidator: {
      name: 'noValidator',
      tags: [],
      default: 'true',
    },
    validatorFunction: {
      name: 'validatorFunction',
      tags: [],
      validator: 'validatorStub',
    },
    validatorMethod: {
      name: 'validatorMethod',
      tags: [],
      validator: `validator(value) {
  return [1, 2, 3].includes(value);
}`,
    },
  },
  events: {},
};
