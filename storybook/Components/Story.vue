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

<template>
  <div class="story">
    <slot name="description">
      <Description
        :description="meta.description"
        :name="meta.name"
        class="story__description"
      />
    </slot>

    <slot name="props">
      <div class="story__props">
        <h2 class="story__title">Props</h2>
        <PropsTable
          :props="meta.props"
          :custom-types="meta.customTypes"
          class="table"
        />
      </div>
    </slot>

    <slot name="events">
      <div class="story__events">
        <h2 class="story__title">Events</h2>
        <EventsTable
          :events="meta.events"
          :custom-types="meta.customTypes"
          class="table"
        />
      </div>
    </slot>

    <slot name="example" />
  </div>
</template>

<style lang="scss" scoped>
.story {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

  &__title {
    margin-bottom: 10px;
  }

  &__description {
    margin-bottom: 40px;
  }

  &__props {
    margin-bottom: 40px;
  }

  &__events {
    margin-bottom: 40px;
  }
}

.table {
  width: 100%;
}
</style>
