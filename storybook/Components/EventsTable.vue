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
      <template v-if="column.id === 'name'">
        <div class="name">
          <span class="name-title">{{ dataItem.name }}</span>
          <span class="name-description">{{ dataItem.description }}</span>
        </div>
      </template>

      <template v-else-if="column.id === 'payload' && dataItem.payload">
        <Type
          class="type"
          :type="dataItem.payload"
          :custom-types="customTypes"
        ></Type>
      </template>
    </template>
  </BaseTable>
</template>

<style lang="scss" scoped>
@import '../styles/common';

.name {
  &-title {
    display: block;
    margin-bottom: 6px;
  }
  &-description {
    display: block;
    color: $color-gray50;
    font-size: 14px;
  }
}
</style>
