module.exports = {
  props: [{ name: 'superProp', type: 'Prop', description: 'Typed Prop' }],
  description: 'Awesome component',
  events: [{ name: 'change' }],
  customTypes: [
    {
      name: 'Prop',
      description: '',
      type: '{test: string}',
    },
  ],
};
