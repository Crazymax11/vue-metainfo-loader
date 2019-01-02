<template>
  <div />
</template>

<script>
export default {
  props: {
    validatorArrowFunction: {
      validator: () => true,
    },

    noValidator: {
      default: true,
    },
  },
};
</script>
