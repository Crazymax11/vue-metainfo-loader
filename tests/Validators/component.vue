<template>
  <div />
</template>

<script>
export default {
  props: {
    validatorArrowFunction: {
      validator: () => true,
    },

    validatorMethod: {
      validator(value) {
        return [1, 2, 3].includes(value);
      },
    },

    validatorFunction: {
      validator: validatorStub,
    },

    noValidator: {
      default: true,
    },

    validatorWithDescription: {
      /**
       * Test description
       *
       * @acceptable 1,2,3
       */
      validator: () => true,
    },
  },
};

function validatorStub() {}
</script>
