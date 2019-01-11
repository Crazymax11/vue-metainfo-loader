module.exports = {
  events: [
    { name: 'clicked', description: 'when component is clicked' },
    { name: 'changed' },
    { name: 'statusChanged', payload: 'boolean' },
    {
      name: 'anotherStatusChanged',
      payload: 'boolean',
      description: 'value is a new status',
    },
  ],
  description: 'Test',
  props: [
    {
      name: 'sample',
      description: 'Just a prop',
      required: true,
      type: 'Array',
    },
    { name: 'short', description: 'Short prop', type: 'Array' },
  ],
};
