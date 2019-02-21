<script>
import Type from './Type.vue';
import BaseTable from './BaseTable.vue';

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
    BaseTable,
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

  data() {
    return {
      columns: [
        {
          id: 'name',
          title: 'Name',
        },
        {
          id: 'type',
          title: 'Type',
        },
        {
          id: 'default',
          title: 'Default',
        },
        {
          id: 'validator',
          title: 'Validator',
        },
      ],
    };
  },
};
</script>

<template>
  <BaseTable :columns="columns" :data="props">
    <template slot="cell" slot-scope="{ column, dataItem }">
      <div v-if="column.id === 'name'" class="name">
        <span class="name__title">{{ dataItem.name }}</span>
        <span class="name__description">{{ dataItem.description }}</span>
      </div>

      <Type
        v-else-if="column.id === 'type'"
        class="type"
        :type="dataItem.type"
        :custom-types="customTypes"
      ></Type>

      <template v-else-if="column.id === 'default'">
        <span v-if="dataItem.required" class="required">Required</span>
        <span v-else-if="dataItem.default" class="default">
          <span v-if="dataItem.default.description" class="default-description">
            {{ dataItem.default.description }}
          </span>
          <code class="code">
            <pre>{{ dataItem.default.value }}</pre>
          </code>
        </span>
      </template>

      <template v-else-if="column.id === 'validator' && dataItem.validator">
        <span
          v-if="dataItem.validator.description"
          class="validator-description"
        >
          {{ dataItem.validator.description }}
        </span>
        <code class="code">
          <pre>{{ dataItem.validator.value }}</pre>
        </code>
      </template>
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
