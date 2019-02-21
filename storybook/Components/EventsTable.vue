<script>
import Type from './Type.vue';
import BaseTable from './BaseTable.vue';

/**
 * @typedef {{
 *    name: string,
 *    description: string,
 *    payload: string
 * }} Event
 */

/**
 * @typedef {{
 *      name: string,
 *      description: string,
 *      type: string
 * }} CustomType
 */

/**
 * Events Table
 */
export default {
  components: {
    Type,
    BaseTable,
  },

  props: {
    /**
     * Список пропс
     *
     * @type {Event[]}
     */
    events: {
      type: Array,
      required: true,
    },

    /**
     * Список кастомных типов, которые могут находиться внутри
     * переданных типов пропс
     *
     * @type {CustomType[]}
     */
    customTypes: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      columns: [
        {
          id: 'name',
          title: 'Name',
        },
        {
          id: 'payload',
          title: 'Payload',
        },
      ],
    };
  },
};
</script>

<template>
  <BaseTable :columns="columns" :data="events">
    <template slot="cell" slot-scope="{ column, dataItem }">
      <div v-if="column.id === 'name'" class="name">
        <span class="name__title">{{ dataItem.name }}</span>
        <span class="name__description">{{ dataItem.description }}</span>
      </div>

      <Type
        v-else-if="column.id === 'payload' && dataItem.payload"
        class="type"
        :type="dataItem.payload"
        :custom-types="customTypes"
      ></Type>
    </template>
  </BaseTable>
</template>

<style lang="scss" scoped>
@import '../styles/common';

.name {
  &__title {
    display: block;
    margin-bottom: 6px;
  }
  &__description {
    display: block;
    color: $color-gray50;
    font-size: 14px;
  }
}
</style>
