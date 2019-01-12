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

<template>
  <div>
    <h3>{{ title }}</h3>
    <button @click="onClick">LIKE</button>
    <button @click="$emit('dislikeClicked')">DISLIKE</button>
    <a :href="link">About</a>
  </div>
</template>
