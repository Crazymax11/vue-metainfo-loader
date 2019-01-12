<template lang="pug">
div
  div events
  div {{ str }}
</template>

<script>
export default {
  props: {
    events: {
      type: Array,
    },
  },
  computed: {
    // debug
    str() {
      return JSON.stringify(this.events);
    },
  },
};
</script>
<style lang="scss" scoped>
.test {
  color: red;
}
</style>
