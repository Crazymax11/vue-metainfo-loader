<script>
/**
 * @typedef {{
 *   id: string,
 *   title: string
 * }} Column
 */

/**
 * @typedef {*} DataItem
 */

/**
 * @typedef {{
 *   column: Column,
 *   dataItem: DataItem
 * }} SlotScope
 */

/**
 * Base Table
 *
 * Создает таблицу по переданным колонкам и данным.
 * Нужные данные в ячейки нужно рендерить самостоятельно,
 * для этого есть слот `cell`, в который передается SlotScope.
 *
 * @example
 * <BaseTable :columns="columns" :data="props">
 *   <template slot="cell" slot-scope="{ column, dataItem }">
 *      <!-- Рендерим нужный контент на основании column и dataItem -->
 *   </template>
 * </BaseTable>
 */
export default {
  props: {
    /**
     * Table columns
     * @type {Column[]}
     */
    columns: {
      type: Array,
      required: true,
    },

    /**
     * Table data
     * @type {DataItem[]}
     */
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.id">{{ column.title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(dataItem, index) in data" :key="index">
        <td
          v-for="column in columns"
          :key="column.id"
          :data-label="column.title"
        >
          <slot name="cell" :column="column" :dataItem="dataItem"></slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
@import '../styles/common';

.table {
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  table-layout: fixed;
  font-size: 16px;

  td,
  th {
    padding: 12px;
    border-bottom: 1px solid $color-gray90;
    vertical-align: top;
    text-align: left;
    transition: background-color 0.2s;
  }

  thead {
    text-align: left;

    td,
    th {
      padding-top: 18px;
      padding-bottom: 18px;
      font-weight: bold;
      font-size: 14px;
      color: $color-gray50;
    }
  }

  tbody {
    tr:hover {
      td {
        background-color: $color-gray98;
      }
    }
  }
}
</style>
