module.exports = {
  props: {
    validatorArrowFunction: {
      validator: { value: '() => true' },
      name: 'validatorArrowFunction',
    },
    noValidator: {
      name: 'noValidator',
      default: { value: 'true' },
    },
    validatorFunction: {
      name: 'validatorFunction',
      validator: { value: 'validatorStub' },
    },
    validatorMethod: {
      name: 'validatorMethod',
      validator: {
        value: `validator(value) {
  return [1, 2, 3].includes(value);
}`,
      },
    },
    validatorWithDescription: {
      name: 'validatorWithDescription',
      validator: {
        value: '() => true',
        description: 'Test description',
        tags: [
          {
            title: 'acceptable',
            description: '1,2,3',
          },
        ],
      },
    },
  },
  events: {},
};
