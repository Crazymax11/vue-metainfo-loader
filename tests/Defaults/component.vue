<template>
  <div />
</template>

<script>
export default {
  props: {
    defaultArrowFunction: {
      default: () => true,
    },

    defaultMethod: {
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
  },
};

function defaultStub() {}
</script>
