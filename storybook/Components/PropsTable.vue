<script>
/**
 * Props Table
 */
export default {
  props: {
    props: {
      type: Array,
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

<template>
  <div>
    <div>props</div>
    <div>{{ str }}</div>
  </div>
</template>

<style lang="scss" scoped>
.test {
  color: red;
}
</style>
