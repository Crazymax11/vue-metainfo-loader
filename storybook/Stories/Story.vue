<template lang="pug">
div
    div Story
    Story(:meta="meta")

    hr
    Story(:meta="componentMeta")
        template(slot="example")
            Component(
                :title="Component"
            )

</template>

<script>
import Story from '../Components/Story.vue';
import Component from '../Components/Component.vue';

export default {
  components: {
    Story,
    Component,
  },
  data: () => ({
    meta: Story.meta,
    componentMeta: Component.meta,
  }),
};
</script>
