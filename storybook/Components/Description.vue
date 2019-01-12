<template lang="pug">
div
    h1 {{name}}
    div {{description}}
</template>
<script>
export default {
  props: {
    description: String,
    name: String,
  },
};
</script>
