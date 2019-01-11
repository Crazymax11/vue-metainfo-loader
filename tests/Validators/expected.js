module.exports = {
  props: [
    { name: 'validatorArrowFunction', validator: { value: '() => true' } },

    {
      name: 'validatorMethod',
      validator: {
        value: `validator(value) {
  return [1, 2, 3].includes(value);
}`,
      },
    },
    { name: 'validatorFunction', validator: { value: 'validatorStub' } },
    { name: 'noValidator', default: { value: 'true' } },
    {
      name: 'validatorWithDescription',
      validator: {
        value: '() => true',
        description: 'Test description',
      },
    },
  ],
  events: [],
};
