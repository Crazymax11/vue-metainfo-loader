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

<template>
  <div>
    <div>events</div>
    <div>{{ str }}</div>
  </div>
</template>

<style lang="scss" scoped>
.test {
  color: red;
}
</style>
