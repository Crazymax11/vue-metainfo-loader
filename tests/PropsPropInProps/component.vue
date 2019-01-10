<template lang="pug">
    div
</template>
<script>
/**
 * Parser should not crash.
 */
export default {
  props: {
    props: {
      type: Array,
    },
  },
  computed: {
    stringifedProps() {
      return JSON.stringify(this.props);
    },
  },
};
</script>
