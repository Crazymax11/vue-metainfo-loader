<script>
import Type from './Type.vue';

/**
 * @typedef {{
 *    name: string,
 *    type: string,
 *    description: string,
 *    required: boolean,
 *    default: {
 *        value: string,
 *        description: string,
 *    },
 *    validator: {
 *        value: string,
 *        description: string,
 *    }
 * }} Prop
 */

/**
 * @typedef {{
 *      name: string,
 *      description: string,
 *      type: string
 * }} CustomType
 */

/**
 * Props Table
 */
export default {
  components: {
    Type,
  },

  props: {
    /**
     * Список пропс
     *
     * @type {Prop[]}
     */
    props: {
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
};
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Default</th>
        <th>Validator</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="prop in props" :key="prop.name">
        <td data-label="Name">
          <div class="name">
            <span class="name-title">{{ prop.name }}</span>
            <span class="name-description">{{ prop.description }}</span>
          </div>
        </td>

        <td data-label="Type">
          <Type
            class="type"
            :type="prop.type"
            :custom-types="customTypes"
          ></Type>
        </td>

        <td data-label="Default">
          <span v-if="prop.required" class="required">Required</span>
          <span v-else-if="prop.default" class="default">
            <span v-if="prop.default.description" class="default-description">
              {{ prop.default.description }}
            </span>
            <code class="code">
              <pre>{{ prop.default.value }}</pre>
            </code>
          </span>
        </td>

        <td data-label="Validator">
          <template v-if="prop.validator">
            <span
              v-if="prop.validator.description"
              class="validator-description"
            >
              {{ prop.validator.description }}
            </span>
            <code class="code">
              <pre>{{ prop.validator.value }}</pre>
            </code>
          </template>
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

.required {
  color: $color-red;
}

.default-description {
  display: block;
  margin-bottom: 6px;
}

.validator-description {
  display: block;
  margin-bottom: 6px;
}

.code {
  display: inline-block;
  font-size: 13px;
  padding: 6px 12px;
  border-radius: 3px;
  background-color: $color-gray90;

  pre {
    margin: 0;
  }
}
</style>
