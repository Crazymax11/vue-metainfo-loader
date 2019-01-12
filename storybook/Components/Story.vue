<template lang="pug">
    div Story
        slot(name="description")
            Description(
                :description="meta.description"
                :name="meta.name"
            )
        slot(name="props")
            PropsTable(:props="meta.props")
        slot(name="events")
            EventsTable(:events="meta.events")
        slot
        slot(name="example")
</template>
<script>
import PropsTable from './PropsTable.vue';
import EventsTable from './EventsTable.vue';
import Description from './Description.vue';

/**
 * Presents component's meta information.
 * Ready to use with vue-metainfo-loader
 */
export default {
  components: {
    PropsTable,
    EventsTable,
    Description,
  },
  props: {
    /**
     * MetaInfo from vue-metainfo-loader
     * @type {Object}
     */
    meta: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.test {
}
</style>
