<template lang="pug">
div.test {{ str }}
</template>

<script>
/**
 * Props Table
 */
export default {
  props: {
    props: {
      type: Object,
    },
  },
  computed: {
    // debug
    str() {
      return JSON.stringify(this.props);
    },
  },
};
</script>
<style lang="scss" scoped>
.test {
  color: red;
}
</style>
