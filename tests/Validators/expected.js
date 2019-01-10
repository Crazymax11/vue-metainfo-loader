module.exports = {
  props: {
    validatorArrowFunction: {
      validator: { value: '() => true' },
      name: 'validatorArrowFunction',
      tags: [],
    },
    noValidator: {
      name: 'noValidator',
      tags: [],
      default: { value: 'true' },
    },
    validatorFunction: {
      name: 'validatorFunction',
      tags: [],
      validator: { value: 'validatorStub' },
    },
    validatorMethod: {
      name: 'validatorMethod',
      tags: [],
      validator: {
        value: `validator(value) {
  return [1, 2, 3].includes(value);
}`,
      },
    },
    validatorWithDescription: {
      name: 'validatorWithDescription',
      tags: [],
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
