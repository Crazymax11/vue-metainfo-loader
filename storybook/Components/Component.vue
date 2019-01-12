<template lang="pug">
div
    h3 {{title}}
    button(@click="onClick") LIKE
    button(@click="$emit('dislikeClicked')") DISLIKE
    a(:href="link") About
</template>

<script>
/**
 * Feedback panel
 */
export default {
  props: {
    /**
     * Title of feedback panel
     */
    title: {
      type: String,
      // Checks if string is not empty
      validator(value) {
        return value.length;
      },
      required: true,
    },
    link: {
      type: String,
      default: '/about',
    },
  },
  methods: {
    onClick() {
      this.$emit('likeClicked');
    },
  },
};
</script>
