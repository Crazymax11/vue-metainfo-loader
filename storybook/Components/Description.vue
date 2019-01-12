<script>
export default {
  props: {
    description: String,
    name: String,
  },
};
</script>

<template>
  <div>
    <h1>{{ name }}</h1>
    <div>{{ description }}</div>
  </div>
</template>
