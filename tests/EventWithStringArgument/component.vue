<template>
  <div />
</template>

<script>
export default {
  methods: {
    emitEvent() {
      this.$emit('updateFieldValue', {
        field: 'field',
        value: 'value',
      });
    },
  },
};
</script>
