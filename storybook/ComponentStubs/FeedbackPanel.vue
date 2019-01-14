<script>
/**
 * @typedef {{
 *     url: string,
 *     title: string,
 *     link: Link,
 *     type: TestType
 * }} Link
 */

/**
 * @typedef {string} TestType
 */

/**
 * @typedef {Link[]} Links
 */

/**
 * Feedback panel
 *
 * @emits likeClicked        - click on like button
 * @emits dislikeClicked     - click on dislike button
 * @emits linkClicked {Link} - click on link, payload has Link object
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

    /**
     * Links
     * @type {Links}
     */
    links: {
      type: Array,
      default() {
        return [];
      },
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
    <a
      v-for="link in links"
      :key="link.title"
      :href="link.url"
      @click="$emit('linkClicked', link)"
    >
      {{ link.title }}
    </a>
  </div>
</template>
