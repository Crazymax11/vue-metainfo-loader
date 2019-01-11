module.exports = {
  description: '',
  events: [
    { name: 'hello', payload: 'number' },
    { name: 'change', payload: 'ChangeEvent', description: '- comment' },
    { name: 'set', payload: 'string', description: 'comment' },
    { name: 'update', description: 'comment' },
    { name: 'delete' },
  ],
  props: [],
};
