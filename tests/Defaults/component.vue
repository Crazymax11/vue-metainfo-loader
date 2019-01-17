<template>
  <div />
</template>

<script>
export default {
  props: {
    defaultArrowFunction: {
      /**
       * returns true
       */
      default: () => true,
    },

    defaultMethod: {
      // returns [1, 2, 3]
      default() {
        return [1, 2, 3];
      },
    },

    defaultFunction: {
      default: defaultStub,
    },

    defaultString: {
      default: 'string',
    },

    defaultBoolean: {
      default: true,
    },

    defaultNumber: {
      default: 123,
    },

    defaultObject: {
      default: {},
    },

    defaultArray: {
      default: [],
    },

    noDefault: {},

    defaultWithDescription: {
      /**
       * This is default description
       * @type {Array} test
       */
      default: [],
    },
  },
};

function defaultStub() {}
</script>
