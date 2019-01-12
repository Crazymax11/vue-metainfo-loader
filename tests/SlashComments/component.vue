<template>
  <div />
</template>
<script>
// Line 1
// Line 2
export default {
  props: {
    // line 1
    // line 2
    propWithMultilineComment: {
      // Validator
      // comment
      validator() {
        return true;
      },
      // Default
      // comment
      default: 'test',
    },

    // line 1
    propWithOneComment: {
      // Validator comment
      validator() {
        return true;
      },
      // Default comment
      default: 'test',
    },
  },
};
</script>
