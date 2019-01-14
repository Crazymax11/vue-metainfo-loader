<script>
import prettifyTypeString from '../../src/prettifyTypeString';

/**
 * @typedef {{
 *      name: string,
 *      description: string,
 *      type: string
 * }} CustomType
 */

export default {
  props: {
    /**
     * Строка с типом
     */
    type: {
      type: String,
      required: true,
    },

    /**
     * Список кастомных типов, которые могут находиться внутри
     * переданной строки с типом
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
      /**
       * Развернутый тип. При нажатии на ссылку типа - это значение изменяется,
       * на место названия типа вставляется содержимое этого типа. Это значение
       * без расставленных отступов, переносов и html тэгов
       *
       * @type {string}
       */
      typeString: this.type,
    };
  },

  computed: {
    /**
     * Мапа кастомных типов, ключи - имена типов
     *
     * @returns {Object.<string, CustomType>}
     */
    containedTypesMap() {
      return this.customTypes.reduce((result, customType) => {
        // eslint-disable-next-line
        result[customType.name] = customType;
        return result;
      }, {});
    },

    /**
     * Удобочитаемая строка с типом. Расставлены отступы и переносы,
     * вставлены ссылки на кастомные типы
     *
     * @returns {string}
     */
    typeStringTemplate() {
      const typesNames = this.customTypes.map(({ name }) => name);
      const typeString = prettifyTypeString(this.typeString, {
        tabSymbol: '&nbsp;',
        breakSymbol: '<br>',
      });
      return typeString.replace(
        this.containedTypesRegExp(typesNames),
        '<a href="#" data-name="$&">$&</a>',
      );
    },

    /**
     * Был ли развернут тип
     *
     * @returns {boolean}
     */
    isExpanded() {
      return this.typeString !== this.type;
    },
  },

  methods: {
    /**
     * Возвращает регулярное выражение для поиска кастомных типов в строке
     *
     * @param {string[]} typesNames
     * @returns {RegExp}
     */
    containedTypesRegExp(typesNames) {
      const typesNamesRegExpPart = typesNames.join('|');
      return new RegExp(`(?<=^|\\W)(?:${typesNamesRegExpPart})(?=$|\\W)`, 'gm');
    },

    /**
     * Расскрывает кастомный тип при клике на него
     *
     * @param {Event} event
     */
    expandCustomType(event) {
      event.preventDefault();
      const typeName = event.target.dataset.name;
      if (!typeName) {
        return;
      }
      this.typeString = this.typeString.replace(
        this.containedTypesRegExp([typeName]),
        this.containedTypesMap[typeName].type,
      );
    },

    /**
     * Если тип был развернут - сбрасывает его до первоначального состояния
     *
     * @param {Event} event
     */
    resetCustomType(event) {
      event.preventDefault();
      this.typeString = this.type;
    },
  },
};
</script>

<template>
  <div class="type">
    <span
      class="type__value"
      @click.capture="expandCustomType"
      v-html="typeStringTemplate"
    ></span>
    <a v-if="isExpanded" class="type__reset" href="#" @click="resetCustomType">
      Reset
    </a>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/common';

.type {
  display: inline-block;

  /deep/ a {
    color: $color-blue;
    text-decoration: none;

    &:hover {
      color: mix(#000, $color-blue, 30%);
    }
  }

  &__value {
    display: block;
  }

  &__reset {
    font-size: 12px;
  }
}
</style>
